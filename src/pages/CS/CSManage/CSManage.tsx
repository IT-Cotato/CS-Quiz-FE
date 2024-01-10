import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import CSManageLayout from '@pages/CS/CSManage/CSManageLayout';
import QuizContent from '@pages/CS/CSManage/QuizContent';
import { useLocation, useNavigate } from 'react-router-dom';

export interface IQuizContent {
  quizNumber: number;
  question: string;
  approach: boolean;
  quizStart: boolean;
}

const QuizContents: IQuizContent[] = [
  { quizNumber: 1, question: '1번 문제', approach: false, quizStart: false },
  { quizNumber: 2, question: '2번 문제', approach: false, quizStart: false },
  { quizNumber: 3, question: '3번 문제', approach: false, quizStart: false },
  { quizNumber: 4, question: '4번 문제', approach: false, quizStart: false },
];

const CSManage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];

  console.log('generation', generation);
  console.log('week', week);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quizStarted, setQuizStarted] = useState(false);

  const onClickQuizButton = useCallback(() => {
    setQuizStarted(!quizStarted);
  }, [quizStarted]);

  const onClickCheckAllScorer = useCallback(() => {
    navigate(`/cs/allscorer?generation=${generation}&week=${week}`);
    console.log('all scorer click');
  }, []);

  return (
    <CSManageLayout header="CS 문제풀이 관리">
      <ManageWrapper>
        <ButtonWrapper>
          <Button color="#477FEB" onClick={onClickQuizButton}>
            {quizStarted ? '몰루?' : '교육 시작하기'}
          </Button>
          <Button color="#000" onClick={onClickCheckAllScorer}>
            전체 득점자 확인
          </Button>
        </ButtonWrapper>
        <QuizContentsWrapper>
          {QuizContents.map((quiz) => (
            <QuizContent key={quiz.quizNumber} quiz={quiz} generation={generation} week={week} />
          ))}
        </QuizContentsWrapper>
      </ManageWrapper>
    </CSManageLayout>
  );
};

export default CSManage;

const ManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button<{ color: string }>`
  background: #feffff;
  border: none;
  border-radius: 5px;
  padding: 8px 20px;
  cursor: pointer;

  color: ${(props) => props.color};
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
`;

const QuizContentsWrapper = styled.div`
  width: 100%;
`;
