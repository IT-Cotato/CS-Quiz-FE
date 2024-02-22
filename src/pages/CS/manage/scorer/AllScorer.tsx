import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CSManageLayout from '../CSManageLayout';
import { css, styled } from 'styled-components';
import useSWRImmutable from 'swr/immutable';
import fetcher from '@utils/fetcher';
import { IKingMember, IQuizAllScorer } from '@/typing/db';

const AllScorer = () => {
  const [searchParams] = useSearchParams();
  const educationId = searchParams.get('educationId');

  const { data } = useSWRImmutable<IQuizAllScorer[]>(
    `/v1/api/quiz/cs-admin/results?educationId=${educationId}`,
    fetcher,
  );
  const { data: kingMembers } = useSWRImmutable<IKingMember[]>(
    `/v1/api/education/result/kings?educationId=${educationId}`,
    fetcher,
  );

  const [scorers, setScorers] = useState<IQuizAllScorer[]>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    data?.sort((left, right) => left.quizNumber - right.quizNumber);
    setScorers(data);
  }, [data]);

  return (
    <CSManageLayout header="CS 문제 전체 득점자 확인">
      <AllScorerWrapper>
        <ScorerBox>
          {scorers?.map((scorer) => (
            <ScorerContent key={scorer.quizId}>
              <p className="quiz-number">문제 {scorer.quizNumber}</p>
              <p className="scorer">
                {scorer.scorerName}({scorer.backFourNumber})
              </p>
            </ScorerContent>
          ))}
        </ScorerBox>
        <FinalistWrapper>
          <p>최종 문제 풀 사람</p>
          <FinalistBox>
            {kingMembers?.map((king) => (
              <p key={king.memberId}>
                {king.memberName}({king.backFourNumber})
              </p>
            ))}
          </FinalistBox>
        </FinalistWrapper>
      </AllScorerWrapper>
    </CSManageLayout>
  );
};

export default AllScorer;

const AllScorerWrapper = styled.div`
  width: 50%;
`;

const ScorerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 50px 80px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
`;

const fontStyle = css`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  margin: 16px 0;
`;

const ScorerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid rgba(28, 28, 28, 0.3);

  .quiz-number {
    ${fontStyle}
    color: #477feb;
  }

  .scorer {
    ${fontStyle}
  }
`;

const FinalistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 32px 0;

  > p {
    ${fontStyle}
  }
`;

const FinalistBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background: #fff;
  padding: 16px 20px 0;
  box-sizing: border-box;

  > p {
    ${fontStyle}
    margin: 0 0 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  height: 44px;
  border-radius: 5px;
  border: none;
  background: #477feb;
  cursor: pointer;

  ${fontStyle}
  color: #FFF;
`;
