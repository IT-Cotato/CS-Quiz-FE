import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowBack } from '@/assets/arrow_back.svg';
import { ChoiceProps, ShortProps } from '@/typing/db';
import Slides from './Slides';
import EditQuiz from './EditQuiz';
import QuizInfo from './QuizInfo';
import MobileSlides from './MobileSlides';
// TODO: 컴포넌트 분리

type Item = {
  isselected?: string;
};

type QuizType = ChoiceProps | ShortProps;

const CSUpload = () => {
  const location = useLocation();
  const search = location.search;
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];

  // 전체 슬라이드를 담기 위한 state
  const [quiz, setQuiz] = useState<QuizType[]>([
    {
      quiz_id: 1,
      quiz_title: '제목',
      quiz_content: '내용',
      quiz_type: 'choice',
      quiz_answer: [
        {
          choice_num: 1,
          choice_content: '',
        },
      ],
      choices: [
        {
          choice_id: 1,
          choice_content: '',
        },
        {
          choice_id: 2,
          choice_content: '',
        },
        {
          choice_id: 3,
          choice_content: '',
        },
        {
          choice_id: 4,
          choice_content: '',
        },
      ],
      quiz_image_file: null,
      quiz_preview_url: null,
    },
  ]);

  // 현재 선택된 슬라이드를 나타내기 위한 state
  const [selected, setSelected] = useState(1); // selected가 0인 경우에는 주제, 1 이상인 경우에는 슬라이드의 문제 번호를 나타냄

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
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: 'leftbox centerbox rightbox';
  grid-gap: 0;
  flex-direction: row;
  box-shadow:
    -2px 1px 10px 1px rgba(0, 0, 0, 0.15),
    2px 4px 10px 0px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 768px) {
    padding: 20px 0px;
    grid-template-columns: 1fr 1fr 1fr;
    /* grid-template-rows: 1fr 1fr 1fr; */
    grid-template-areas:
      'leftbox leftbox leftbox'
      'centerbox centerbox centerbox'
      'rightbox rightbox rightbox';
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
