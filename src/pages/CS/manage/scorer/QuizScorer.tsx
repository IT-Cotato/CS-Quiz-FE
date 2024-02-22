import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CSManageLayout from '@pages/CS/manage/CSManageLayout';
import { css, styled } from 'styled-components';
import { IQuizAdminScorer, IQuizAdminSubmit } from '@/typing/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import AddAnswer from '@pages/CS/manage/scorer/AddAnswer';
import useSWRImmutable from 'swr/immutable';

const QuizScorer = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');

  const { data: quiz } = useSWRImmutable<IQuizAdminScorer>(
    `/v1/api/quiz/cs-admin?quizId=${quizId}`,
    fetcher,
  );
  const { data: record } = useSWR(`/v1/api/record/all?quizId=${quizId}`, fetcher, {
    dedupingInterval: 1000,
  });
  const [submits, setSubmits] = useState<IQuizAdminSubmit[]>();
  const [scorer, setScorer] = useState<IQuizAdminScorer>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSubmits(record?.records);
    setScorer(record?.scorer);
  }, [record]);

  return (
    <CSManageLayout header="CS 문제별 득점자 확인">
      <QuizScorerWrapper>
        <TitleWrapper>
          <p className="quiz-number">문제{quiz?.quizNumber}</p>
          <p className="question">{quiz?.question}</p>
        </TitleWrapper>
        <ColumnDivision>
          <HalfContainer width="55%">
            <p>제출 순 나열</p>
            <SubmitBox>
              {submits?.map((submit, index) => (
                <SubmitContent key={index}>
                  <p>
                    {submit.memberName}({submit.backFourNumber})
                  </p>
                  <SubmitResult>
                    <p>
                      {submit.reply}
                      {quiz?.quizType === 'MULTIPLE_QUIZ' && '번'}
                    </p>
                  </SubmitResult>
                </SubmitContent>
              ))}
            </SubmitBox>
          </HalfContainer>
          <HalfContainer width="45%">
            <p>득점자</p>
            <ScorerBox>
              <p>{scorer?.memberName ? `${scorer.memberName}(${scorer.backFourNumber})` : ''}</p>
            </ScorerBox>
            <p>문제 정답</p>
            <AnswerBox>
              {quiz?.answer.map((ans, idx) => (
                <p key={idx}>
                  {ans}
                  {quiz.quizType === 'MULTIPLE_QUIZ' && '번'}
                </p>
              ))}
            </AnswerBox>
            <AddAnswer quizId={quizId} quizType={quiz?.quizType} />
          </HalfContainer>
        </ColumnDivision>
      </QuizScorerWrapper>
    </CSManageLayout>
  );
};

export default QuizScorer;

const QuizScorerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-bottom: 48px;
`;

const fontStyle = css`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  margin: 16px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: #fff;
  border-radius: 8px;

  > p {
    margin: 16px 0;
  }

  .quiz-number {
    ${fontStyle}
    text-align: center;
    color: #477feb;
    width: 100px;
  }

  .question {
    ${fontStyle}
  }
`;

const ColumnDivision = styled.div`
  display: flex;
  width: 100%;
  margin-top: 36px;
`;

const HalfContainer = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${(props) => props.width};

  > p {
    ${fontStyle};
    margin: 8px 0;
  }
`;

const Box = styled.div`
  display: flex;
  border-radius: 8px;
  background: #fff;
  padding: 8px;
  box-sizing: border-box;
`;

const SubmitBox = styled(Box)`
  width: 90%;
  min-height: 70vh;
  flex-direction: column;
  align-items: center;
`;

const SubmitContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  padding: 0 12px;
  border-bottom: 1px solid rgba(28, 28, 28, 0.3);

  display: flex;
  align-items: center;
  cursor: pointer;

  > p {
    ${fontStyle};
  }
`;

const ScorerBox = styled(Box)`
  width: 100%;
  height: 56px;
  margin-bottom: 20px;

  > p {
    ${fontStyle}
    margin: 8px;
  }
`;

const SubmitResult = styled.div`
  > p {
    ${fontStyle};
    color: #85c88a;
  }
`;

const AnswerBox = styled(Box)`
  display: block;
  width: 100%;
  margin-bottom: 20px;

  > p {
    ${fontStyle};
    color: #85c88a;
    margin: 8px;
  }
`;
