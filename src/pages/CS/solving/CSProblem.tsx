import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import defaultImg from '@assets/cotato_icon.png';
import { ReactComponent as LightBulb } from '@assets/light.svg';
import light from '@assets/light_on.svg';
import bubble1 from '@assets/bubble_1.svg';
import bubble2 from '@assets/bubble_2.svg';
import bubble3 from '@assets/bubble_3.svg';
import bigger from '@assets/expand.svg';
import smaller from '@assets/compress.svg';
import BgCorrect from '@pages/CS/solving/BgCorrect';
import BgIncorrect from '@pages/CS/solving/BgIncorrect';
import BgWaiting from './BgWaiting';
import { useLocation } from 'react-router-dom';

// 전체 문제 데이터(res) 받아와서 한 번만 까서 일단 문제 리스트에 다 넣기
// problems.push(res.multiples)
// problems.push(res.shortQuizzes)
// number 기준으로 1번 문제부터 오름차순 정렬
// map으로 1번부터 10번까지 문제 뿌려주기

type Problem = {
  number: number;
  type: string;
  question: string;
  image?: string;
  multiple?: Choices[];
  shortAnswer?: ShortAnswer[];
};

type Choices = {
  choiceNum: number;
  choice: string;
  isAnswer: string;
};

type ShortAnswer = {
  answer: string;
};

const CSProblem = () => {
  const location = useLocation();
  const search = location.search;
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];

  const [index, setIndex] = useState(0);
  const [chose, setChose] = useState(0);
  const [shortAns, setShortAns] = useState('');

  const [showWaiting, setShowWaiting] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);

  const [biggerImg, setBiggerImg] = useState(false);

  const [isDirect, setIsDirect] = useState(false);

  const inputRef = useRef<any>();

  const [isHoverOnLight, setIsHoverOnLight] = useState(false);

  const problems: Problem[] = [
    {
      number: 1,
      type: 'MULTIPLE_QUIZ',
      question: '다음 중 웹 서버의 종류가 아닌 것은?',
      image: defaultImg,
      multiple: [
        {
          choiceNum: 1,
          choice: 'Apache',
          isAnswer: 'NO_ANSWER',
        },
        {
          choiceNum: 2,
          choice: 'Nginx',
          isAnswer: 'NO_ANSWER',
        },
        {
          choiceNum: 3,
          choice: 'IIS',
          isAnswer: 'NO_ANSWER',
        },
        {
          choiceNum: 4,
          choice: 'Tomcat',
          isAnswer: 'ANSWER',
        },
      ],
    },
    {
      number: 2,
      type: 'SHORT_QUIZ',
      question: 'CS 플젝 프론트엔드는?',
      image: defaultImg,
      shortAnswer: [
        {
          answer: '손민재',
        },
        {
          answer: '조원영',
        },
        {
          answer: '황동현',
        },
      ],
    },
    {
      number: 3,
      type: 'MULTIPLE_QUIZ',
      question: 'CS플젝 마감 일자를 고르시오.',
      multiple: [
        {
          choiceNum: 1,
          choice: '1월 31일',
          isAnswer: 'NO_ANSWER',
        },
        {
          choiceNum: 2,
          choice: '2월 16일',
          isAnswer: 'ANSWER',
        },
        {
          choiceNum: 3,
          choice: '2월 23일',
          isAnswer: 'NO_ANSWER',
        },
        {
          choiceNum: 4,
          choice: '2월 29일',
          isAnswer: 'NO_ANSWER',
        },
      ],
    },
    {
      number: 4,
      type: 'MULTIPLE_QUIZ',
      question: 'CS플젝 마감 일자를 고르시오.',
      multiple: [
        {
          choiceNum: 1,
          choice: '1월 31일',
          isAnswer: 'NO_ANSWER',
        },
        {
          choiceNum: 2,
          choice: '2월 16일',
          isAnswer: 'ANSWER',
        },
        {
          choiceNum: 3,
          choice: '2월 23일',
          isAnswer: 'NO_ANSWER',
        },
        {
          choiceNum: 4,
          choice: '2월 29일',
          isAnswer: 'NO_ANSWER',
        },
      ],
    },
  ];

  // 전체 문제의 정답 배열 생성
  const answers: (number | string[])[] = []; // [4, ['손민재', '조원영', '황동현'], ...]

  problems.forEach((el) => {
    if (el.multiple) {
      el.multiple.forEach((num) => {
        if (num.isAnswer === 'ANSWER') {
          answers.push(num.choiceNum);
        }
      });
    } else if (el.shortAnswer) {
      const shortAnswers: string[] = [];
      el.shortAnswer.forEach((ans) => {
        shortAnswers.push(ans.answer);
      });
      answers.push(shortAnswers);
    }
  });

  // 객관식 문제의 선지 배열 생성
  const choices: string[][] = []; // [['Apache', 'Nginx', 'IIS', 'Tomcat'], ...]]

  problems.forEach((el) => {
    if (el.multiple) {
      const eachChoices: string[] = [];
      el.multiple.forEach((ch) => {
        eachChoices.push(ch.choice);
      });
      choices.push(eachChoices);
    } else {
      choices.push([]);
    }
  });

  // 주관식 문제 입력 이벤트
  const onChangeShortAns = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShortAns(e.target.value);
  }, []);

  // 다음문제 클릭 이벤트
  const nextProblem = () => {
    setChose(0);
    setIsDirect(true);
    setShowWaiting(true);
    setTimeout(() => {
      if (index < 9) {
        setIndex(index + 1);
        setIsDirect(false);
      }
      window.scrollTo(0, 0);
    }, 4000);
    console.log(choices);
    console.log(answers);
  };

  // 제출하기 클릭 이벤트
  const sumbitProblem = () => {
    if (problems[index].multiple) {
      if (chose === 0) {
        alert('답을 선택한 후 제출해주세요.');
      } else if (chose !== answers[index]) {
        setShowIncorrect(true);
        setShowCorrect(false);
      } else {
        setShowCorrect(true);
        setShowIncorrect(false);
        nextProblem();
      }
      console.log(answers);
      console.log(chose);
    } else if (problems[index].shortAnswer) {
      if (!shortAns) {
        alert('답을 입력한 후 제출해주세요.');
      } else if (!(answers[index] as string[]).includes(shortAns)) {
        setShowIncorrect(true);
        setShowCorrect(false);
      } else {
        setShowCorrect(true);
        setShowIncorrect(false);
        nextProblem();
      }
      console.log(shortAns);
    }
  };

  useEffect(() => {
    if (showIncorrect) {
      const timeoutId = setTimeout(() => setShowIncorrect(false), 2000);
      return () => clearTimeout(timeoutId); // 컴포넌트가 언마운트되면 setTimeout 취소
    }
    if (showCorrect) {
      const timeoutId = setTimeout(() => setShowCorrect(false), 2000);
      return () => clearTimeout(timeoutId);
    }
    if (showWaiting) {
      const timeoutId = setTimeout(() => setShowWaiting(false), 8000);
      return () => clearTimeout(timeoutId);
    }
  }, [showIncorrect, showCorrect, showWaiting]);

  return (
    <Wrapper>
      <ProgressContainer>
        <ProgressBar progress={(index + 1) * 10} />
      </ProgressContainer>
      <QuizContainer>
        <QuestionContainer>
          <p>문제 {problems[index].number}</p>
          <span>{problems[index].question}</span>
        </QuestionContainer>
        {problems[index].image && (
          <ImageContainer bigger={biggerImg}>
            <Image src={problems[index].image} alt={`문제${problems[index].number}의 이미지`} />
            <ResizeIcon
              src={biggerImg ? smaller : bigger}
              onClick={() => setBiggerImg(!biggerImg)}
            />
          </ImageContainer>
        )}
        <LightImgContainer>
          {isHoverOnLight && <div>불이 켜지면 제출!</div>}
          <LightBulb style={{ width: '28px' }} />
          <LightOn>
            <img src={bubble1} alt="bubble 1" />
            <img src={bubble2} alt="bubble 2" />
            <img src={bubble3} alt="bubble 3" />
            <img src={light} alt="light" />
          </LightOn>
        </LightImgContainer>
        {problems[index].multiple && (
          <Choice chose={chose} setChose={setChose} items={choices} index={index} />
        )}
        {problems[index].shortAnswer && (
          <ShortAnswer
            shortAns={shortAns}
            onChangeShortAns={onChangeShortAns}
            inputRef={inputRef}
          />
        )}
        <ButtonContainer>
          <button onClick={nextProblem}>다음문제</button>
          <button onClick={sumbitProblem}>제출하기</button>
        </ButtonContainer>
      </QuizContainer>
      {showWaiting && <BgWaiting directToNext={isDirect} />}
      {showCorrect && <BgCorrect />}
      {showIncorrect && <BgIncorrect />}
    </Wrapper>
  );
};

type ChoiceProps = {
  clicked?: boolean;
};

type ResizeProps = {
  bigger?: boolean;
};

interface choiceProps {
  chose: number; // 선택한 선지의 번호
  setChose: React.Dispatch<React.SetStateAction<number>>;
  items: string[][]; // 선지의 내용들
  index: number;
}

const Choice: React.FC<choiceProps> = ({ chose, setChose, items, index }) => {
  return (
    <ChoiceContainer>
      <ChoiceBtn clicked={chose === 1} onClick={() => setChose(1)}>
        {items[index][0]}
      </ChoiceBtn>
      <ChoiceBtn clicked={chose === 2} onClick={() => setChose(2)}>
        {items[index][1]}
      </ChoiceBtn>
      <ChoiceBtn clicked={chose === 3} onClick={() => setChose(3)}>
        {items[index][2]}
      </ChoiceBtn>
      <ChoiceBtn clicked={chose === 4} onClick={() => setChose(4)}>
        {items[index][3]}
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
  position: relative;
  padding-bottom: 40px;
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

const ImageContainer = styled.div<ResizeProps>`
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

const LightOn = styled.div`
  position: absolute;
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

const ChoiceBtn = styled.div<ChoiceProps>`
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

const ButtonContainer = styled.div`
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
`;
