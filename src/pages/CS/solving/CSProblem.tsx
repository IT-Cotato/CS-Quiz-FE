import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import bigger from '@assets/expand.svg';
import smaller from '@assets/compress.svg';
import { ReactComponent as LightBulb } from '@assets/light.svg';
import light from '@assets/light_on.svg';
import bubble1 from '@assets/bubble_1.svg';
import bubble2 from '@assets/bubble_2.svg';
import bubble3 from '@assets/bubble_3.svg';
import explaination from '@assets/explaination.svg';
import MemberHeader from '@components/MemberHeader';
import api from '@/api/api';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import BgCorrect from './BgCorrect';
import BgIncorrect from './BgIncorrect';
import BgWaiting from './BgWaiting';
import BgKingKing from './BgKingKing';
import { set } from 'date-fns';

type Problem = {
  id: number; // 문제의 PK
  number: number; // 문제 번호
  type: string; // 문제 유형 (객관식 or 주관식)
  question: string; // 문제 내용
  image?: string; // 문제 이미지 url
  choices?: Choices[]; // 객관식 선지
  shortAnswers?: [] | null; // 주관식 정답
};

type Choices = {
  choiceId: number; // 객관식 선지의 PK
  number: number; // 객관식 선지 번호
  content: string; // 객관식 선지 내용
  isAnswer?: string | null; // 해당 선지의 정답 여부
};

interface CSProblemProps {
  quizId: number | null;
  submitAllowed: boolean;
  problemId: number;
}

const CSProblem: React.FC<CSProblemProps> = ({ quizId, submitAllowed, problemId }) => {
  const { data, error, isLoading, mutate } = useSWR('/v1/api/member/info', fetcher);
  if (data) {
    console.log(data);
  } else {
    console.log('data is undefined');
  }

  const [showHeader, setShowHeader] = useState(false);
  const [quizData, setQuizData] = useState<Problem | undefined>();
  const [multiples, setMultiples] = useState<string[]>([]); // 객관식 선지의 내용 리스트
  const [biggerImg, setBiggerImg] = useState(false);
  const [selectNum, setSelectNum] = useState(0);
  const [shortAns, setShortAns] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showExplaination, setShowExplaination] = useState(false);
  const [returnToWaiting, setReturnToWaiting] = useState(false);
  const [showKingKing, setShowKingKing] = useState(false);

  const inputRef = useRef<any>();

  // 최초 마운트 이후부터 문제 변경을 감지하여 다음 문제 보여주기
  const mountRef = useRef(false);
  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
    } else {
      setReturnToWaiting(false);
    }
  }, [problemId]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/v1/api/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setQuizData(res.data);
          console.log(res.data);
          console.log(multiples);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const initializeData = async () => {
      await setMultiples([]); // 문제 바뀔 때 이전 선지 초기화
      fetchData();
    };

    initializeData();
  }, [problemId]); // quizId가 바뀌면 문제 데이터를 다시 불러옴

  useEffect(() => {
    // 객관식 선지의 내용을 리스트에 담기 (quizData가 업데이트된 후에 선지 내용 설정)
    if (quizData?.choices) {
      quizData.choices.forEach((item) => {
        setMultiples((prev) => [...prev, item.content]);
      });
    }
    // 문제 바뀔 때 이전 입력 답안 초기화
    setShortAns('');
    setSelectNum(0);
  }, [quizData]);

  useEffect(() => {
    // 정답/오답 화면 표시 후 위에 깔리지 않도록 삭제
    if (showCorrect) {
      const timeoutId = setTimeout(() => setShowCorrect(false), 2500);
      return () => clearTimeout(timeoutId);
    }
    if (showIncorrect) {
      const timeoutId = setTimeout(() => setShowIncorrect(false), 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [showCorrect, showIncorrect]);

  useEffect(() => {
    if (quizData?.number === 10) {
      setShowKingKing(true);
      // setTimeout(() => setShowKingKing(false), 10000);
    }
  }, [quizData]);

  // 주관식 문제 입력 이벤트
  const onChangeShortAns = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShortAns(e.target.value);
  }, []);

  const nextProblem = () => {
    // 다음 문제로 이동
    // 아직 다음 문제 안열렸으면 대기 상태로
    if (submitAllowed) {
      setReturnToWaiting(true);
    }
  };

  const submitProblem = () => {
    // 문제 제출하기
    const input = quizData?.choices ? selectNum.toString() : shortAns;

    if (!data) {
      console.log('data is not loaded yet');
      return; // data가 undefined라면(아직 불러와지지 않았다면) 함수 종료
    } else {
      api
        .post(
          '/v1/api/record/reply',
          {
            quizId: quizId,
            memberId: data.memberId,
            input: input,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        .then((res) => {
          console.log(res);
          if (res.data.result === 'true') {
            setShowCorrect(true);
            if (submitAllowed) {
              // 정답인데 아직 문제가 닫히지 않은 경우 대기화면으로 보냄
              setTimeout(() => setReturnToWaiting(true), 2500);
            }
          } else {
            setShowIncorrect(true);
          }
        })
        .catch((err) => {
          console.error(err);
          console.log(quizId, data.memberId, input);
          if (err.response.status === 400) {
            alert('아직 제출 기한이 아닙니다.');
          }
        });
    }
  };

  const propsForMemberHeader = {
    showHeader,
    setShowHeader,
  };

  return (
    <Wrapper>
      {showHeader ? <MemberHeader {...propsForMemberHeader} /> : null}
      <ProgressContainer>
        <ProgressBar progress={(quizData?.number as number) * 10} />
      </ProgressContainer>
      <QuizContainer>
        <QuestionContainer>
          <p>문제 {quizData?.number}</p>
          <span>{quizData?.question}</span>
        </QuestionContainer>
        {quizData?.image && (
          <ImageContainer bigger={biggerImg}>
            <Image src={quizData?.image} alt={`문제${quizData?.number}의 이미지`} />
            <ResizeIcon
              src={biggerImg ? smaller : bigger}
              onClick={() => setBiggerImg(!biggerImg)}
            />
          </ImageContainer>
        )}
        <LightImgContainer>
          {!submitAllowed && showExplaination && (
            <Explaination>
              불이 켜지면
              <br />
              제출!
            </Explaination>
          )}
          <LightBulb
            style={{ width: '28px' }}
            onMouseEnter={() => setShowExplaination(true)}
            onMouseLeave={() => setShowExplaination(false)}
          />
          {submitAllowed && (
            <LightOn>
              <img src={bubble1} alt="bubble 1" />
              <img src={bubble2} alt="bubble 2" />
              <img src={bubble3} alt="bubble 3" />
              <img src={light} alt="light" />
            </LightOn>
          )}
        </LightImgContainer>
        {quizData?.choices && (
          <Choice selectNum={selectNum} setSelectNum={setSelectNum} contents={multiples} />
        )}
        {!quizData?.choices && (
          <ShortAnswer
            shortAns={shortAns}
            onChangeShortAns={onChangeShortAns}
            inputRef={inputRef}
          />
        )}
        <ButtonContainer disabled={!submitAllowed}>
          <button onClick={nextProblem}>다음문제</button>
          <button onClick={submitProblem}>제출하기</button>
        </ButtonContainer>
      </QuizContainer>
      {showCorrect && <BgCorrect />}
      {showIncorrect && <BgIncorrect />}
      {showKingKing && <BgKingKing quizId={quizId} />}
      {returnToWaiting && <BgWaiting />}
    </Wrapper>
  );
};

interface choiceProps {
  selectNum: number; // 선택한 선지의 번호
  setSelectNum: React.Dispatch<React.SetStateAction<number>>;
  contents: string[]; // 객관식 선지의 내용 리스트
}

const Choice: React.FC<choiceProps> = ({ selectNum, setSelectNum, contents }) => {
  return (
    <ChoiceContainer>
      <ChoiceBtn
        clicked={selectNum === 1}
        onClick={() => {
          setSelectNum(1);
        }}
      >
        {contents[0]}
      </ChoiceBtn>
      <ChoiceBtn
        clicked={selectNum === 2}
        onClick={() => {
          setSelectNum(2);
        }}
      >
        {contents[1]}
      </ChoiceBtn>
      <ChoiceBtn
        clicked={selectNum === 3}
        onClick={() => {
          setSelectNum(3);
        }}
      >
        {contents[2]}
      </ChoiceBtn>
      <ChoiceBtn
        clicked={selectNum === 4}
        onClick={() => {
          setSelectNum(4);
        }}
      >
        {contents[3]}
      </ChoiceBtn>
    </ChoiceContainer>
  );
};

interface ShortAnsProps {
  shortAns: string;
  onChangeShortAns: React.ChangeEventHandler<HTMLInputElement>;
  inputRef: React.MutableRefObject<any>;
}

const ShortAnswer: React.FC<ShortAnsProps> = ({ shortAns, onChangeShortAns, inputRef }) => {
  useEffect(() => inputRef.current.focus(), []); // 컴포넌트 마운트 즉시 포커싱

  return (
    <ShortAnswerContainer>
      <input
        type="text"
        id="shortAns"
        name="shortAns"
        value={shortAns}
        onChange={onChangeShortAns}
        placeholder="답안을 입력해주세요"
        ref={inputRef}
      />
    </ShortAnswerContainer>
  );
};

export default CSProblem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  padding-bottom: 60px;
  overflow: auto;
  overflow-x: hidden;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 10px;
  background: #477feb;
  justify-content: flex-start;
  transition-property: width;
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
`;

const QuizContainer = styled.div`
  /* width: 920px; */
  padding: 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionContainer = styled.div`
  width: 920px;
  min-height: 88px;
  height: fit-content;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 48px;
  padding: 20px 80px !important;
  p {
    color: #477feb;
    font-family: Inter;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 20px 3px 0;
  }
  span {
    color: #000;
    font-family: NanumSquareRound;
    font-size: 1.1rem;
    font-weight: 600;
    width: 680px;
  }
`;

const ImageContainer = styled.div<{ bigger: boolean }>`
  position: relative;
  width: 528px;
  height: 301px;
  margin-bottom: 52px;
  ${(props) =>
    props.bigger
      ? `
      transform: scale(1.2);
      transition: transform 0.3s;
      margin-top: 36px;
      margin-bottom: 84px;
    `
      : `
        transform: scale(1);
        transition: transform 0.3s;
      `};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;

const ResizeIcon = styled.img`
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 20px;
`;

const LightImgContainer = styled.div`
  position: absolute;
  width: 80px;
  height: 82px;
  right: 300px;
  bottom: 316px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Explaination = styled.div`
  background-image: url(${explaination});
  position: absolute;
  bottom: 20px;
  font-size: 0.75rem;
  color: #454545;
  width: 80px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 44px;
`;

const LightOn = styled.div`
  position: relative;
  width: 80px;
  height: 82px;
  padding: 0 auto;
  img {
    position: absolute;
    @keyframes up {
      0% {
        transform: translateY(24px);
      }
      100% {
        transform: translateY(10px);
      }
    }
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      60% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    &:nth-child(1) {
      width: 44px;
      left: 20px;
      bottom: 68px;
      animation:
        up 3s infinite ease 2s,
        fadeOut 3s infinite ease;
    }
    &:nth-child(2) {
      width: 4px;
      left: 28px;
      bottom: 84px;
      animation:
        up 2.5s infinite ease,
        fadeOut 2.5s infinite ease 3s;
    }
    &:nth-child(3) {
      width: 6px;
      left: 44px;
      bottom: 88px;
      animation:
        up 4s infinite ease 2.5s,
        fadeOut 2.5s infinite ease;
    }
    // 전구 ON 불빛
    &:nth-child(4) {
      width: 80px;
      bottom: 8px;
      animation: twinkle 0.7s ease-in-out infinite alternate;
      @keyframes twinkle {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
`;

const ChoiceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 12px;
  grid-column-gap: 16px;
  align-items: stretch !important;
`;

const ChoiceBtn = styled.div<{ clicked: boolean }>`
  width: 454px;
  min-height: 68px;
  height: fit-content;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding: 20px 32px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s;
  }
  ${(props) => props.clicked && `background: #D2D2D2;`}
`;

const ShortAnswerContainer = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  padding-left: 80px;
  input {
    border: none;
    outline: none;
    font-family: NanumSquareRound;
    font-size: 1rem;
    font-weight: 400;
  }
`;

const ButtonContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 60px;
  width: 920px;
  justify-content: flex-end;
  button {
    width: 96px;
    height: 36px;
    border-radius: 5px;
    border: 2px solid #bebebe;
    background: #feffff;
    color: #2e2e2e;
    font-family: NanumSquareRound;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:last-child {
      background: #477feb;
      border: none;
      color: #fff;
      margin-left: 8px;
    }
  }
  ${(props) =>
    props.disabled &&
    `button:first-child {
      &:hover {
        cursor: default;
      }
    }
    button:last-child {
      background: ${props.theme.color.lightGrey};
      &:hover {
        cursor: default;
    }
  }`}
`;
