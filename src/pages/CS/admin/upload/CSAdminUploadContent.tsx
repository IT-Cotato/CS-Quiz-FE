import { Multiples, ShortQuizzes } from '@/typing/db';
import React from 'react';
import styled from 'styled-components';
import CSAdminUploadSlides from './CSAdminUploadSlides';
import CSAdminUploadMobileSlides from './CSAdminUploadMobileSlides';
import CSAdminUploadEditQuiz from './CSAdminUploadEditQuiz';
import CSAdminUploadQuizInfo from './CSAdminUploadQuizInfo';

interface CSAdminUploadContentProps {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  educationId: number;
}

type QuizType = Multiples | ShortQuizzes;

const CSAdminUploadContent = ({
  quiz,
  setQuiz,
  selected,
  setSelected,
  educationId,
}: CSAdminUploadContentProps) => {
  return (
    <Section>
      <CSAdminUploadSlides
        quiz={quiz}
        setQuiz={setQuiz}
        selected={selected}
        setSelected={setSelected}
      />
      <CSAdminUploadMobileSlides
        quiz={quiz}
        setQuiz={setQuiz}
        selected={selected}
        setSelected={setSelected}
      />
      <CSAdminUploadEditQuiz quiz={quiz} setQuiz={setQuiz} selected={selected} />
      <CSAdminUploadQuizInfo
        quiz={quiz}
        selected={selected}
        setQuiz={setQuiz}
        educationId={educationId}
      />
    </Section>
  );
};

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

export default CSAdminUploadContent;
