import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CSManageLayout from '@pages/CS/manage/CSManageLayout';
import QuizContent from '@pages/CS/manage/QuizContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { TQuiz } from '@/typing/db';

const CSManage = () => {
  const [searchParams] = useSearchParams();
  const educationId = searchParams.get('educationId');
  const navigate = useNavigate();

  const { data: quizData } = useSWR(`/v1/api/quiz/all?educationId=${educationId}`, fetcher);
  const [quizzes, setQuizzes] = useState<TQuiz[]>();
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const quizArr: TQuiz[] = [];
    quizData?.multiples.map((quiz: any) => {
      quizArr.push(quiz);
    });
    quizData?.shortQuizzes.map((quiz: any) => {
      quizArr.push(quiz);
    });

    quizArr.sort((left, right) => left.number - right.number);
    setQuizzes(quizArr);
  }, [quizData]);

  const onClickQuizButton = useCallback(() => {
    if (!quizStarted && confirm('퀴즈를 시작하시겠습니까?')) {
      setQuizStarted(true);
    } else if (quizStarted && confirm('퀴즈를 종료하시겠습니까?')) {
      setQuizStarted(false);
    }
  }, [quizStarted]);

  const onClickCheckAllScorer = useCallback(() => {
    navigate(`/cs/allscorer?educationId=${educationId}`);
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
          {quizzes?.map((quiz) => <QuizContent key={quiz.number} quiz={quiz} />)}
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
