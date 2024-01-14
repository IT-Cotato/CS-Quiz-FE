import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CSManageLayout from './CSManageLayout';
import { css, styled } from 'styled-components';

/*
최종 문제 풀 사람은 어떻게 계산되는 건가

문제 번호가 마지막이 10번인거 보다 차라리 킹으로 처리되는게 더 좋은거 같기도
그리고 getFinalist 함수 쓸꺼면 해당 회차 퀴즈의 문제 개수를 가져와야 함

ScorerBox에서 이름이 우측으로 붙어서 쫌 짜침
*/

const scorerList = [
  { quiz: 1, name: '조원영', phone: 1111 },
  { quiz: 2, name: '조원영', phone: 2222 },
  { quiz: 3, name: '조원영', phone: 3333 },
  { quiz: 4, name: '조원영', phone: 4444 },
  { quiz: 5, name: '조원영', phone: 5555 },
  { quiz: 6, name: '조원영', phone: 6666 },
  { quiz: 7, name: '조원영', phone: 7777 },
  { quiz: 8, name: '조원영', phone: 8888 },
  { quiz: 9, name: '조원영', phone: 9999 },
  { quiz: 10, name: '조원영', phone: 1111 },
];

const AllScorer = () => {
  const [searchParams] = useSearchParams();
  const generation = searchParams.get('generation');
  const week = searchParams.get('week');
  console.log(generation, week);

  const onclickSubmitButton = useCallback(() => {
    console.log('submit click');
  }, []);

  // 함수 너무 복잡(타입 정리 필요)
  const getFinailists = useCallback((): { name?: string; phone?: string }[] => {
    // 킹 문제 이전까지
    if (scorerList.length < 10) {
      return [];
    }

    const scorerMap = new Map();
    scorerList.forEach((element) => {
      const key = element.name + ':' + element.phone.toString();
      const count = scorerMap.has(key) ? scorerMap.get(key) : 0;
      scorerMap.set(key, count + 1);
    });

    const countArray = Array.from(scorerMap).sort((left, right) => right[1] - left[1]);
    const finalist: { name: string; phone: string }[] = [];
    countArray.forEach((element) => {
      if (element[1] < countArray[0][1]) {
        return true;
      }
      finalist.push({ name: element[0].split(':')[0], phone: element[0].split(':')[1] });
    });

    return finalist;
  }, [scorerList]);

  return (
    <CSManageLayout header="CS 문제 전체 득점자 확인">
      <AllScorerWrapper>
        <ScorerBox>
          {scorerList.map((scorer) => (
            <ScorerContent key={scorer.quiz}>
              <p className="quiz-number">문제 {scorer.quiz}</p>
              <p className="scorer">
                {scorer.name}({scorer.phone})
              </p>
            </ScorerContent>
          ))}
        </ScorerBox>
        <FinalistWrapper>
          <p>최종 문제 풀 사람</p>
          <FinalistBox>
            {getFinailists().map((finalist, index) => (
              <p key={index}>
                {finalist.name}({finalist.phone})
              </p>
            ))}
          </FinalistBox>
          <ButtonWrapper>
            <SubmitButton onClick={onclickSubmitButton}>전송</SubmitButton>
          </ButtonWrapper>
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
