import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowBack } from '@/assets/arrow_back.svg';
import { Multiples, ShortQuizzes } from '@/typing/db';
import Slides from './Slides';
import EditQuiz from './EditQuiz';
import QuizInfo from './QuizInfo';
import MobileSlides from './MobileSlides';
// TODO: 컴포넌트 분리

type Item = {
  isselected?: string;
};

type QuizType = Multiples | ShortQuizzes;

const CSUpload = () => {
  const location = useLocation();
  const search = location.search;
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];

  // 전체 슬라이드를 담기 위한 state
  const [quiz, setQuiz] = useState<QuizType[]>([
    {
      number: 1,
      question: '',
      choices: [
        {
          number: 1,
          content: '',
          isAnswer: 'NO_ANSWER',
        },
        {
          number: 2,
          content: '',
          isAnswer: 'NO_ANSWER',
        },
        {
          number: 3,
          content: '',
          isAnswer: 'NO_ANSWER',
        },
        {
          number: 4,
          content: '',
          isAnswer: 'NO_ANSWER',
        },
      ],
      image: null,
      previewUrl: null,
    },
  ]);

  // 현재 선택된 슬라이드를 나타내기 위한 state
  const [selected, setSelected] = useState(0);

  return (
    <>
      <Wrapper>
        <TitleBox>
          <BackButton />
          <h1>CS 문제업로드</h1>
          <p>{`${generation}기 / ${week}차 세션`}</p>
        </TitleBox>
        <Section>
          <Slides quiz={quiz} setQuiz={setQuiz} selected={selected} setSelected={setSelected} />
          <MobileSlides
            quiz={quiz}
            setQuiz={setQuiz}
            selected={selected}
            setSelected={setSelected}
          />
          <EditQuiz quiz={quiz} setQuiz={setQuiz} selected={selected} />
          <QuizInfo quiz={quiz} selected={selected} setQuiz={setQuiz} />
        </Section>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 20px 120px;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const BackButton = styled(ArrowBack)`
  width: 25px;
  height: 25px;
  align-self: center;
  margin: 0px 0 0 0px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 40px 0px;
  h1 {
    font-size: 32px;
    margin-right: 16px;
  }
  p {
    font-size: 16px;
    font-weight: 700;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Section = styled.div`
  min-width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 'leftbox centerbox rightbox';
  grid-gap: 0;
  flex-direction: row;
  box-shadow:
    -2px 1px 10px 1px rgba(0, 0, 0, 0.15),
    2px 4px 10px 0px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 768px) {
    padding: 0;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'leftbox leftbox leftbox'
      'centerbox centerbox centerbox'
      'rightbox rightbox rightbox';
    -ms-grid-column-align: center;
    height: fit-content;
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const Item = styled.div<Item>`
  width: 200px;
  height: 48px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background: ${(props: any) => (props.isselected === 'true' ? '#C4D7FF' : '#E4ECFD')};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
  margin: 16px 0;
  transition: 0.2s;
`;

export default CSUpload;
