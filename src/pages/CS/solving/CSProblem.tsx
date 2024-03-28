import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import bigger from '@assets/expand.svg';
import smaller from '@assets/compress.svg';
import lightBulb from '@assets/light.svg';
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
    // console.log(data);
  } else {
    console.log('data is undefined');
  }

  const [showHeader, setShowHeader] = useState(false);
  const [quizData, setQuizData] = useState<Problem | undefined>();
  const [multiples, setMultiples] = useState<string[]>([]); // 객관식 선지의 내용 리스트
  const [biggerImg, setBiggerImg] = useState(false);
  const [selectNum, setSelectNum] = useState(0);
  const [selected, setSelected] = useState<string[]>([]); // 최종적으로 선택한 선지번호 리스트
  const [shortAns, setShortAns] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showExplaination, setShowExplaination] = useState(false);
  const [returnToWaiting, setReturnToWaiting] = useState(false);
  const [showKingKing, setShowKingKing] = useState(false);

  const inputRef = useRef<any>();

  const multipleRef = useRef<any>();
  const shortRef = useRef<any>();
  const mulYPos = multipleRef.current?.offsetTop;
  const mulXPos = multipleRef.current?.offsetLeft + multipleRef.current?.offsetWidth;
  const shortYPos = shortRef.current?.offsetTop;
  const shortXPos = shortRef.current?.offsetLeft + shortRef.current?.offsetWidth;

  // 최초 마운트 이후부터 문제 변경을 감지하여 다음 문제 보여주기
  const mountRef = useRef(false);
  useEffect(() => {
    console.log('shortXPos' + shortXPos);
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

  // 주관식 문제 입력 이벤트
  const onChangeShortAns = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShortAns(e.target.value);
  }, []);

  const nextProblem = () => {
    // 다음 문제로 이동
    // 아직 다음 문제 안열렸으면 대기 상태로
    if (submitAllowed) {
      if ((quizData?.number as number) === 10) {
        setReturnToWaiting(false);
      } else {
        setReturnToWaiting(true);
      }
    }
  };

  const submitProblem = () => {
    // 문제 제출하기
    const input = quizData?.choices ? selected : [shortAns];

    if (!data) {
      console.log('data is not loaded yet');
      return; // data가 undefined라면(아직 불러와지지 않았다면) 함수 종료
    } else {
      if (submitAllowed && (selected.length === 0 || shortAns === '')) {
        alert('답안을 선택 후 제출해주세요.');
        return;
      } else {
        api
          .post(
            '/v1/api/record/reply',
            {
              quizId: quizId,
              memberId: data.memberId,
              inputs: input,
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
                if ((quizData?.number as number) !== 10) {
                  setTimeout(() => setReturnToWaiting(true), 2500);
                } else {
                  setReturnToWaiting(false);
                }
              }
            } else {
              setShowIncorrect(true);
            }
          })
          .catch((err) => {
            console.error(err);
            console.log(quizId, data.memberId, input);
            if (err.response.data.message === 'cannot access this quiz') {
              alert('아직 제출 기한이 아닙니다.');
            } else if (err.response.data.message === 'Already Correct') {
              alert('이미 정답 처리되었습니다.');
            }
          });
      }
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
        <QuestionContainer ifNoImg={!quizData?.image}>
          <p>문제 {quizData?.number}</p>
          <span>{quizData?.question}</span>
        </QuestionContainer>
        {quizData?.image && (
          <ImageContainer bigger={biggerImg}>
            <Image src={quizData?.image} alt={`문제${quizData?.number}의 이미지`} />
            {window.innerWidth > 392 && (
              <ResizeIcon
                src={biggerImg ? smaller : bigger}
                onClick={() => setBiggerImg(!biggerImg)}
              />
            )}
          </ImageContainer>
        )}
        {window.innerWidth > 392 && (
          <LightImgContainer
            mulYPos={mulYPos}
            mulXPos={mulXPos}
            shortYPos={shortYPos}
            shortXPos={shortXPos}
          >
            {!submitAllowed && showExplaination && (
              <Explaination>
                불이 켜지면
                <br />
                제출!
              </Explaination>
            )}
            <LightBulb
              src={lightBulb}
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
        )}
        {quizData?.choices && (
          <Choice
            selectNum={selectNum}
            setSelectNum={setSelectNum}
            selected={selected}
            setSelected={setSelected}
            contents={multiples}
            multipleRef={multipleRef}
          />
        )}
        {!quizData?.choices && (
          <ShortAnswer
            shortAns={shortAns}
            onChangeShortAns={onChangeShortAns}
            inputRef={inputRef}
            problemId={problemId}
            shortRef={shortRef}
          />
        )}
        <ButtonContainer disabled={!submitAllowed}>
          {quizData?.number === 10 ? null : <button onClick={nextProblem}>다음문제</button>}
          <button onClick={submitProblem}>제출하기</button>
        </ButtonContainer>
      </QuizContainer>
      {showCorrect && <BgCorrect />}
      {showIncorrect && <BgIncorrect />}
      {showKingKing && <BgKingKing quizId={quizId} />}
      {returnToWaiting && (
        <BgWaiting quizNum={(quizData?.number as number) + 1} setShowKingKing={setShowKingKing} />
      )}
    </Wrapper>
  );
};

interface choiceProps {
  selectNum: number; // 선택한 선지의 번호
  setSelectNum: React.Dispatch<React.SetStateAction<number>>;
  selected: string[]; // 최종적으로 선택한 선지번호 리스트
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  contents: string[]; // 객관식 선지의 내용 리스트
  multipleRef: React.MutableRefObject<any>;
}

const Choice: React.FC<choiceProps> = ({
  selectNum,
  setSelectNum,
  selected,
  setSelected,
  contents,
  multipleRef,
}) => {
  return (
    <ChoiceContainer ref={multipleRef}>
      <ChoiceBtn
        clicked={selected.includes('1')}
        onClick={() => {
          setSelectNum(1);
          console.log(selectNum, selected);
          if (selected.includes('1') === false) {
            setSelected([...selected, '1']);
          } else {
            setSelected(selected.filter((item) => item !== '1'));
          }
        }}
      >
        {contents[0]}
      </ChoiceBtn>
      <ChoiceBtn
        clicked={selected.includes('2')}
        onClick={() => {
          setSelectNum(2);
          console.log(selectNum, selected);
          if (selected.includes('2') === false) {
            setSelected([...selected, '2']);
          } else {
            setSelected(selected.filter((item) => item !== '2'));
          }
        }}
      >
        {contents[1]}
      </ChoiceBtn>
      <ChoiceBtn
        clicked={selected.includes('3')}
        onClick={() => {
          setSelectNum(3);
          console.log(selectNum, selected);
          if (selected.includes('3') === false) {
            setSelected([...selected, '3']);
          } else {
            setSelected(selected.filter((item) => item !== '3'));
          }
        }}
      >
        {contents[2]}
      </ChoiceBtn>
      <ChoiceBtn
        clicked={selected.includes('4')}
        onClick={() => {
          setSelectNum(4);
          console.log(selectNum, selected);
          if (selected.includes('4') === false) {
            setSelected([...selected, '4']);
          } else {
            setSelected(selected.filter((item) => item !== '4'));
          }
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
  shortRef: React.MutableRefObject<any>;
  problemId: number;
}

const ShortAnswer: React.FC<ShortAnsProps> = ({
  shortAns,
  onChangeShortAns,
  inputRef,
  shortRef,
  problemId,
}) => {
  useEffect(() => inputRef.current.focus(), [problemId]); // 컴포넌트 마운트 즉시 포커싱

  return (
    <ShortAnswerContainer ref={shortRef}>
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
  /* background-color: #fff;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100; */
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

  @media screen and (max-width: 392px) {
    width: 100%;
    padding: 0 9px;
  }
`;

const QuestionContainer = styled.div<{ ifNoImg: boolean }>`
  width: 920px;
  min-height: 88px;
  height: fit-content;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  ${(props) => (props.ifNoImg ? `margin-bottom: 120px;` : `margin-bottom: 48px;`)};
  padding: 20px 60px !important;
  p {
    color: #477feb;
    font-family: Inter;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 3px 0;
  }
  span {
    color: #000;
    font-family: NanumSquareRound;
    font-size: 1.1rem;
    font-weight: 600;
    width: 90%;
  }

  @media screen and (max-width: 392px) {
    width: 100%;
    padding: 20px !important;
    p {
      margin: 0 0 4px 0;
    }
    span {
      width: 78%;
    }
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

  @media screen and (max-width: 392px) {
    width: 332px;
    height: 189px;
  }
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

interface PosProps {
  mulYPos: number;
  mulXPos: number;
  shortYPos: number;
  shortXPos: number;
}
const LightImgContainer = styled.div<PosProps>`
  position: absolute;
  width: 80px;
  /* height: 82px;
  right: 300px;
  bottom: 316px; */
  ${(props) =>
    props.mulYPos &&
    `
    top: ${props.mulYPos - 96}px;
    left: ${props.mulXPos - 88}px;
  `}
  ${(props) =>
    props.shortYPos &&
    `
    top: ${props.shortYPos - 96}px;
    left: ${props.shortXPos - 88}px;
  `}
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  margin-bottom: 16px;
`;

const LightBulb = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 40px;
`;

const LightOn = styled.div`
  position: relative;
  width: 80px;
  height: 100%;
  padding: 0 auto;
  margin-top: 24px;
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
      width: 40px;
      left: 20px;
      bottom: 68px;
      animation:
        up 3s infinite ease 2s,
        fadeOut 3s infinite ease;
    }
    &:nth-child(2) {
      width: 3px;
      left: 28px;
      bottom: 84px;
      animation:
        up 2.5s infinite ease,
        fadeOut 2.5s infinite ease 3s;
    }
    &:nth-child(3) {
      width: 4px;
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
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 12px;
  grid-column-gap: 16px;
  align-items: stretch !important;

  @media screen and (max-width: 392px) {
    grid-column-gap: 12px;
  }
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

  @media screen and (max-width: 392px) {
    width: 180px;
    min-height: 100px;
    padding: 20px;
  }
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

  @media screen and (max-width: 392px) {
    padding: 20px;
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

  @media screen and (max-width: 392px) {
    width: 100%;
    padding: 0 9px;
    flex-direction: column;
    position: absolute;
    bottom: 40px;
    button {
      width: 100%;
      height: 64px;
      &:last-child {
        margin-left: 0;
      }
      &:first-child {
        margin-bottom: 8px;
      }
    }
  }
`;
