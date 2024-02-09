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

  const [quizStarted, setQuizStarted] = useState(false);

  const onClickQuizButton = useCallback(() => {
    if (!quizStarted && confirm('퀴즈를 시작하시겠습니까?')) {
      setQuizStarted(true);
    } else if (quizStarted && confirm('퀴즈를 종료하시겠습니까?')) {
      setQuizStarted(false);
    }
  }, [quizStarted]);

  const onClickCheckAllScorer = useCallback(() => {
    navigate(`/cs/allscorer?generation=${generation}&week=${week}`);
  }, []);

  return (
    <CSManageLayout header="CS 문제풀이 관리">
      <ManageWrapper>
        <ButtonWrapper>
          <Button color="#477FEB" onClick={onClickQuizButton}>
            {quizStarted ? '교육 종료하기' : '교육 시작하기'}
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
  width: 160px;
  height: 36px;
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
