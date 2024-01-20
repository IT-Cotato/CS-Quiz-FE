import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultImg from '@assets/cotato_icon.png';
import { ReactComponent as Light } from '@assets/light.svg';
import Header from '@components/Header';
import BgCorrect from '@pages/CS/solving/BgCorrect';
import BgIncorrect from '@pages/CS/solving/BgIncorrect';
import BgWaiting from './BgWaiting';

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
  const [index, setIndex] = useState(0);
  const [chose, setChose] = useState(0);
  const [shortAns, setShortAns] = useState('');

  const [showWaiting, setShowWaiting] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);

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
      image: defaultImg,
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
    setShowWaiting(true);
    setTimeout(() => {
      if (index < 9) {
        setIndex(index + 1);
      }
      window.scrollTo(0, 0);
    }, 2000);
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
      const timeoutId = setTimeout(() => setShowIncorrect(false), 3800);
      return () => clearTimeout(timeoutId); // 컴포넌트가 언마운트되면 setTimeout 취소
    }
    if (showCorrect) {
      const timeoutId = setTimeout(() => setShowCorrect(false), 3800);
      return () => clearTimeout(timeoutId);
    }
    if (showWaiting) {
      const timeoutId = setTimeout(() => setShowWaiting(false), 7000);
      return () => clearTimeout(timeoutId);
    }
  }, [showIncorrect, showCorrect, showWaiting]);

  return (
    <Wrapper>
      <QuizContainer>
        <Container>
          <IndexContainer>{problems[index].number} / 10</IndexContainer>
          <QuestionContainer>
            <p>문제 {problems[index].number}</p>
            <span>{problems[index].question}</span>
          </QuestionContainer>
        </Container>
        {problems[index].image && (
          <Image src={problems[index].image} alt={`문제${problems[index].number}의 이미지`} />
        )}
        {problems[index].multiple && (
          <Choice chose={chose} setChose={setChose} items={choices} index={index} />
        )}
        {problems[index].shortAnswer && (
          <ShortAnswer shortAns={shortAns} onChangeShortAns={onChangeShortAns} />
        )}
        <Light style={{ position: 'absolute', left: '300px', top: '320px', width: '52px' }} />
      </QuizContainer>
      <ButtonContainer>
        <button onClick={nextProblem}>다음문제</button>
        <button onClick={sumbitProblem}>제출하기</button>
      </ButtonContainer>
      {showWaiting && <BgWaiting />}
      {showCorrect && <BgCorrect />}
      {showIncorrect && <BgIncorrect />}
    </Wrapper>
  );
};

type ChoiceProps = {
  clicked?: boolean;
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
}

const ShortAnswer: React.FC<ShortAnsProps> = ({ shortAns, onChangeShortAns }) => {
  return (
    <div>
      <input
        type="text"
        id="shortAns"
        name="shortAns"
        value={shortAns}
        onChange={onChangeShortAns}
      />
    </div>
  );
};

export default CSProblem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 0 220px;
`;

const IndexContainer = styled.div`
  width: 140px;
  height: 68px;
  background: #477feb;
  color: white;
  font-family: Inter;
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
`;

const QuizContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const QuestionContainer = styled.div`
  width: 1000px;
  height: 96px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 96px;
  margin-bottom: 48px;
  padding: 0 80px !important;
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
  }
`;

const Image = styled.img`
  width: 603px;
  height: 344px;
  border-radius: 5px;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 52px;
`;

const ChoiceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 12px;
  grid-column-gap: 16px;
`;

const ChoiceBtn = styled.div<ChoiceProps>`
  width: 494px;
  height: 68px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding: 0 32px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s;
  }
  ${(props) => props.clicked && `background: #D2D2D2;`}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 60px;
  width: 1000px;
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
