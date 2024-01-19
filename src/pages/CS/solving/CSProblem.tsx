import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '@assets/cotato_icon.png';
import { ReactComponent as Light } from '@assets/light.svg';

// 전체 문제 받아와서 한 번 까서 문제 리스트에 넣기
// 넣을 때 type따라 multiple, shortAnswer에 답안 넣고 나머지 한 쪽에는 null값 넣기
//
type Problem = {
  number: number;
  type: string;
  question: string;
  image: string;
  multiple: Choices[] | null;
  shortAnswer: ShortAnswer[] | null;
};

type Choices = {
  choiceNum: number;
  choice: string;
  isAnswer: boolean;
};

type ShortAnswer = {
  answer: string;
};

const CSProblem = () => {
  const [problems, setProblems] = useState<Problem[]>([
    {
      number: 1,
      type: 'MULTIPLE_QUIZ',
      question: '다음 중 웹 서버의 종류가 아닌 것은?',
      image: defaultImg,
      multiple: [
        {
          choiceNum: 1,
          choice: 'Apache',
          isAnswer: false,
        },
        {
          choiceNum: 2,
          choice: 'Nginx',
          isAnswer: false,
        },
        {
          choiceNum: 3,
          choice: 'IIS',
          isAnswer: false,
        },
        {
          choiceNum: 4,
          choice: 'Tomcat',
          isAnswer: true,
        },
      ],
      shortAnswer: null,
    },
    {
      number: 2,
      type: 'SHORT_QUIZ',
      question: 'CS 플젝 프론트엔드는?',
      image: defaultImg,
      multiple: null,
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
  ]);

  const [index, setIndex] = useState<number>(0);

  return (
    <Wrapper>
      <IndexContainer>{index + 1} / 10</IndexContainer>
      <QuizContainer>
        <QuestionContainer>
          <p>문제{index + 1}</p>
          <span>{problems[index].question}</span>
        </QuestionContainer>
        <Image src={problems[index].image} alt={`문제${index}의 이미지`} />
        <ChoiceContainer>
          <Choice>답안 1</Choice>
          <Choice>답안 2</Choice>
          <Choice>답안 3</Choice>
          <Choice>답안 4</Choice>
        </ChoiceContainer>
        <Light style={{ position: 'absolute', left: '300px', top: '320px', width: '52px' }} />
      </QuizContainer>
      <ButtonContainer>
        <button>다음문제</button>
        <button>제출하기</button>
      </ButtonContainer>
    </Wrapper>
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
  font-size: 1.7rem;
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

const Choice = styled.div`
  width: 494px;
  height: 68px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding: 0 32px;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s;
  }
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
    &:last-child {
      background: #477feb;
      border: none;
      color: #fff;
      margin-left: 8px;
    }
  }
`;
