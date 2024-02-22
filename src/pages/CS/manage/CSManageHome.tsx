import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CSManageLayout from '@pages/CS/manage/CSManageLayout';
import QuizContent from '@pages/CS/manage/QuizContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IQuizAdmin } from '@/typing/db';
import api from '@/api/api';

const CSManageHome = () => {
  const [searchParams] = useSearchParams();
  const educationId = searchParams.get('educationId');
  const navigate = useNavigate();

  const { data: quizData, mutate: quizMutate } = useSWR(
    `/v1/api/quiz/cs-admin/all?educationId=${educationId}`,
    fetcher,
  );
  const { data: quizStatus, mutate: statusMutate } = useSWR(
    `/v1/api/education/status?educationId=${educationId}`,
    fetcher,
  );
  const [quizzes, setQuizzes] = useState<IQuizAdmin[]>();
  const [quizNineStart, setQuizNineStart] = useState('');

  useEffect(() => {
    if (quizData) {
      const quizArr: IQuizAdmin[] = quizData.quizzes;
      quizArr.sort((left, right) => left.quizNumber - right.quizNumber);
      setQuizzes(quizArr);

      if (quizData.quizzes.length === 10) {
        setQuizNineStart(quizData.quizzes.find((quiz: IQuizAdmin) => quiz.quizNumber === 9).start);
      }
    }
  }, [quizData]);

  const onClickQuizButton = useCallback(() => {
    let path = '';
    if (quizStatus.status === 'CLOSED' && confirm('교육을 시작하시겠습니까?')) {
      path = '/v1/api/socket/start/csquiz';
    } else if (quizStatus.status === 'ONGOING' && confirm('교육을 종료하시겠습니까?')) {
      path = '/v1/api/socket/close/csquiz';
    }

    api
      .patch(path, { educationId: educationId })
      .then(() => {
        statusMutate();
        quizMutate();
      })
      .catch((err) => {
        console.error(err);
        statusMutate();
        quizMutate();
      });
  }, [quizStatus?.status]);

  const onClickCheckAllScorer = useCallback(() => {
    navigate(`allscorer?educationId=${educationId}`);
  }, []);

  return (
    <CSManageLayout header="CS 문제풀이 관리">
      <ManageWrapper>
        <ButtonWrapper>
          <Button color="#477FEB" onClick={onClickQuizButton}>
            {quizStatus?.status === 'ONGOING' ? '교육 종료하기' : '교육 시작하기'}
          </Button>
          <Button color="#000" onClick={onClickCheckAllScorer}>
            전체 득점자 확인
          </Button>
        </ButtonWrapper>
        <QuizContentsWrapper>
          {quizzes?.map((quiz) => (
            <QuizContent
              key={quiz.quizId}
              quiz={quiz}
              educationId={educationId}
              quizNineStart={quizNineStart}
            />
          ))}
        </QuizContentsWrapper>
      </ManageWrapper>
    </CSManageLayout>
  );
};

export default CSManageHome;

const ManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-bottom: 132px;
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
  padding: 8px 32px;
  cursor: pointer;

  color: ${(props) => props.color};
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
`;

const QuizContentsWrapper = styled.div`
  width: 100%;
`;
