import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CSManageLayout from './CSManageLayout';
import { css, styled } from 'styled-components';

/*
제출 수 나열에서 오답도 같이 제출되면 phone이 유일한 값이 되지 못함
오답 이후에 또 오답이나 정답을 제출 가능
이거를 보여주는 취지는 운영진의 권한으로 시스템상 오답으로 처리 되었지만 정답으로 고치게 해주는거 아니였나?
api로 왔다갔다 할거는 뭐뭐인지

득적자랑 제출 순 나열이랑 어떻게 매칭시킬지

변경버튼을 누르면 체크된 제출자로 득점자가 바뀌고, 확인버튼 누르면 뭐하지?
*/

const submitList = [
  { id: 1, name: '조원영', phone: 1111 },
  { id: 2, name: '조원영', phone: 2222 },
  { id: 3, name: '조원영', phone: 3333 },
  { id: 4, name: '조원영', phone: 4444 },
  { id: 5, name: '조원영', phone: 5555 },
  { id: 6, name: '조원영', phone: 6666 },
];

const QuizScorer = () => {
  const [scorer, setScorer] = useState({ id: 1, name: '조원영', phone: 1111 });
  const [checkedScorer, setCheckedScorer] = useState(scorer);

  const { search, state } = useLocation();
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];
  const quiz = search.split('&')[2].split('=')[1];
  const question = state.question;

  console.log('generation', generation);
  console.log('week', week);
  console.log('quiz', quiz);
  console.log('question', question);

  const onChangeRadio = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newScorer = submitList.find((element) => element.id === parseInt(e.target.value));
    if (newScorer) setCheckedScorer(newScorer);
  }, []);

  const onClickChangeButton = useCallback(() => {
    setScorer(checkedScorer);
  }, [scorer, checkedScorer]);

  const onClickConfirmButton = useCallback(() => {}, []);

  return (
    <CSManageLayout header="CS 문제별 득점자 확인">
      <QuizScorerWrapper>
        <TitleWrapper>
          <p className="quiz-number">문제{quiz}</p>
          <p className="question">{question}</p>
        </TitleWrapper>
        <ColumnDivision>
          <HalfContainer width="55%">
            <p>제출 순 나열</p>
            <SubmitBox>
              {/* 여기서 쓰는값들이 index랑 phone이랑 섞여있이서 쫌 맛탱이가 가버림 */}
              {/* 컴포넌트 분리 고민 */}
              {submitList.map((submit) => (
                <SubmitContent key={submit.id}>
                  <label>
                    <p>
                      {submit.name}({submit.phone})
                    </p>
                    <input
                      type="radio"
                      value={submit.id}
                      checked={submit.id === checkedScorer.id}
                      onChange={onChangeRadio}
                    />
                  </label>
                </SubmitContent>
              ))}
            </SubmitBox>
          </HalfContainer>
          <HalfContainer width="45%">
            <p>득점자</p>
            <ScorerBox>
              <p>
                {scorer.name}({scorer.phone})
              </p>
            </ScorerBox>
            <ButtonWrapper>
              <ChangeButton onClick={onClickChangeButton}>변경</ChangeButton>
              <ConfirmButton onClick={onClickConfirmButton}>확인</ConfirmButton>
            </ButtonWrapper>
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
`;

const fontStyle = css`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
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
  border-bottom: 1px solid rgba(28, 28, 28, 0.3);

  > label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;

    > p {
      ${fontStyle}
      margin: 16px 8px;
    }

    > input {
      cursor: pointer;

      appearance: none;
      width: 24px;
      height: 24px;
      margin-right: 12px;
      border: 1px solid #808080;
      border-radius: 50%;

      &:checked {
        border: 5px solid #ffffff;
        border-radius: 50%;
        background-color: #477feb;
        box-shadow: 0 0 0 1px #808080;
      }
    }
  }
`;

const ScorerBox = styled(Box)`
  width: 100%;

  > p {
    ${fontStyle}
    margin: 8px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 24px 0;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: none;
  margin-left: 8px;
  cursor: pointer;

  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
`;

const ChangeButton = styled(Button)`
  border-radius: 5px;
  background: #c1c1c1;
  color: #2e2e2e;
`;

const ConfirmButton = styled(Button)`
  background: #477feb;
  color: #fff;
`;
