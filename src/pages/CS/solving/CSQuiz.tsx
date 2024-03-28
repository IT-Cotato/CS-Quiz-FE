import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import background from '@assets/bg_waiting.svg';
import mobile from '@assets/bg_waiting_mobile.svg';
import { ReactComponent as Timer } from '@assets/timer.svg';
import api from '@/api/api';
import CSProblem from './CSProblem';
import MemberHeader from '@components/MemberHeader';
import BgWaiting from './BgWaiting';
import { useLocation, useNavigate } from 'react-router-dom';
import { set } from 'date-fns';
import BgKingKing from './BgKingKing';
import BgWinner from './BgWinner';

interface WaitingProps {
  directToNext?: boolean;
}

type MessageType = {
  status?: string | null;
  start?: string | null;
  quizId: number | null;
  command: string;
};

const CSQuiz: React.FC<WaitingProps> = () => {
  const webSocket = React.useRef<WebSocket | undefined>(undefined);

  const [message, setMessage] = useState<MessageType>({
    status: null,
    start: null,
    quizId: null,
    command: '',
  });
  const [showProblem, setShowProblem] = useState<boolean>(false);
  const [showKingKing, setShowKingKing] = useState<boolean>(false);
  const [showWinner, setShowWinner] = useState<boolean>(false);
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
  const [problemId, setProblemId] = useState<number>(0); // = quizId

  const [showHeader, setShowHeader] = useState<boolean>(true);
  const propsForMemberHeader = {
    showHeader,
    setShowHeader,
  };
  window.addEventListener('mousemove', (e) => {
    if (e.clientY < 150) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  });

  const navigate = useNavigate();
  const location = useLocation();
  const educationId = { ...location.state };

  useEffect(() => {
    initializeWebSocket(); // 문제 바뀔 때마다 WebSocket 갱신
  }, [message.quizId]);

  // webSocket 초기 연결 및 메시지 수신
  const initializeWebSocket = async () => {
    await issueSocketToken(); // 토큰 발급이 완료된 후에 연결 요청하도록 함수 호출 타이밍 조절
    connectWebSocket();
    receiveMessage();
  };

  // WebSocket 접속을 위한 30초 토큰 발급
  const issueSocketToken = async () => {
    await api
      .post('/v1/api/socket/token', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const socketToken = res.data.socketToken;
        localStorage.setItem('socketToken', socketToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // WebSocket 연결
  const connectWebSocket = () => {
    webSocket.current = new WebSocket(
      process.env.REACT_APP_SOCKET_URL +
        `/websocket/csquiz?Authorization=${localStorage.getItem('socketToken')}&educationId=${
          educationId.educationId
        }`,
    );
    webSocket.current.onopen = () => {
      console.log('WebSocket connected');
    };
    webSocket.current.onerror = (error) => {
      console.log(error);
    };
  };

  // WebSocket 메시지 수신
  const receiveMessage = () => {
    webSocket.current?.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessage(message);
        console.log(message);
        setProblemId(message.quizId); // 문제 번호 변경을 감지하여 리렌더링 시키기 위함

        if (
          message.status === null &&
          message.start === null &&
          message.quizId === null &&
          message.command === 'show'
        ) {
          console.log('최초 접속- 대기 상태');
          // 대기 화면 보여주기
          setShowProblem(false);
        } else if (
          message.status === 'QUIZ_ON' &&
          message.start === 'QUIZ_OFF' &&
          message.quizId > 0 &&
          message.command === 'show'
        ) {
          console.log('최초 접속- 문제 접근 허용 상태 / ADMIN- 문제 접근 허용 시작');
          // 문제 보여주기, 전구 비활성화, 정답 제출 비허용
          setShowProblem(true);
          setAllowSubmit(false);
        } else if (
          message.status === 'QUIZ_ON' &&
          message.start === 'QUIZ_ON' &&
          message.quizId > 0 &&
          message.command === 'show'
        ) {
          console.log('최초 접속- 정답 제출 허용 상태');
          // 전구 활성화, 정답 제출 허용
          setShowProblem(true);
          setAllowSubmit(true);
        } else if (message.quizId !== 0 && message.command === 'start') {
          console.log('ADMIN- 정답 제출 허용 시작 ');
          // 전구 활성화, 정답 제출 허용
          setShowProblem(true);
          setAllowSubmit(true);
        } else if (message.command === 'exit') {
          console.log('퀴즈 닫기');
          navigate('/cs');
        } else if (message.quizId > 0 && message.command === 'king') {
          console.log('킹킹 문제 풀 사람 반환');
          // 9번 문제 제출 -> 정답 여부 화면 띄웠다가 -> 대기화면 띄워주고 -
          // > 메시지 받으면 킹킹 화면 띄우고 -> 몇 초 보여주고 대기화면 띄우기
          // 9번 문제 다음 -> 대기화면 띄워주고 -> 메시지 받으면 킹킹 화면 띄우고 -
          // > 몇 초 보여주고 다시 대기화면 띄우기
          setShowKingKing(true);
        } else if (message.quizId > 0 && message.command === 'winner') {
          console.log('킹킹 문제 반환');
          // 10번 문제 제출 -> 정답 여부 화면 띄웠다가 -> 다시 10번 문제로 -
          // > 메시지 받으면 우승자 화면 띄우고 끝
          setShowWinner(true);
        } else {
          console.log('exception error');
        }
      } catch (error) {
        console.error('Failed to parse message:', event.data);
      }
    });
  };

  return (
    <Wrapper>
      {showHeader ? <MemberHeader {...propsForMemberHeader} /> : null}
      <Waiting>
        <Timer style={{ width: '68px' }} />
        <div>곧 문제가 시작됩니다. &nbsp;잠시만 기다려주세요!</div>
      </Waiting>
      {showProblem && (
        <div className="problem">
          <CSProblem
            quizId={message.quizId}
            submitAllowed={allowSubmit}
            problemId={problemId}
            showKingKing={showKingKing}
            setShowKingKing={setShowKingKing}
          />
        </div>
      )}
      {/* {showKingKing && <BgKingKing quizId={message.quizId} />} */}
      {showWinner && <BgWinner quizId={message.quizId} />}
    </Wrapper>
  );
};

export default CSQuiz;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .problem {
    background-color: #fff;
    background-size: cover;
    position: absolute;
    height: 100vh;
    overflow: hidden;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
  }
`;

const Waiting = styled.div`
  background: url(${background});
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  div {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 680px;
    height: 80px;
    border-radius: 19px;
    background: #fff;
    color: #477feb;
    font-family: NanumSquareRound;
    font-size: 1.2rem;
    font-weight: 700;
  }

  @media screen and (max-width: 392px) {
    background: url(${mobile});
    div {
      width: 360px;
      height: 72px;
      font-size: 1rem;
      border-radius: 8px;
    }
  }
`;
