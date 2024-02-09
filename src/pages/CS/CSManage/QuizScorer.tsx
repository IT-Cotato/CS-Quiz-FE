import React, { ChangeEvent, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CSManageLayout from './CSManageLayout';
import { css, styled } from 'styled-components';
import { ReactComponent as AddIcon } from '@assets/add_circle.svg';

const submitList = [
  { id: 1, name: '조원영', phone: 1111, record: 1 },
  { id: 2, name: '조원영', phone: 2222, record: 2 },
  { id: 3, name: '조원영', phone: 3333, record: 3 },
  { id: 4, name: '조원영', phone: 4444, record: 4 },
  { id: 5, name: '조원영', phone: 5555, record: 1 },
  { id: 6, name: '조원영', phone: 6666, record: 2 },
];

const QuizScorer = () => {
  const [scorer, setScorer] = useState({ id: 1, name: '조원영', phone: 1111 });
  const [checkedScorer, setCheckedScorer] = useState(scorer);
  const [addAnswer, setAddAnswer] = useState('');

  const { search, state } = useLocation();
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];
  const quiz = search.split('&')[2].split('=')[1];
  const question = state.question;

  const onChangeRadio = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newScorer = submitList.find((element) => element.id === parseInt(e.target.value));
    if (newScorer) setCheckedScorer(newScorer);
  }, []);

  const onClickChangeButton = useCallback(() => {
    setScorer(checkedScorer);
  }, [scorer, checkedScorer]);

  const onClickConfirmButton = useCallback(() => {}, []);

  const onChangeAddAnswer = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAddAnswer(e.target.value);
    },
    [addAnswer],
  );

  const onClickAddAnswerButton = useCallback(() => {}, []);

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
              {/* 컴포넌트 분리 고민 */}
              {submitList.map((submit) => (
                <SubmitContent key={submit.id}>
                  <label>
                    <input
                      type="radio"
                      value={submit.id}
                      checked={submit.id === checkedScorer.id}
                      onChange={onChangeRadio}
                    />
                    <p>
                      {submit.name}({submit.phone})
                    </p>
                  </label>
                  <SubmitResult>{submit.record}번</SubmitResult>
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
            <p>문제 정답</p>
            <AnswerBox>
              <p>뭘까영</p>
            </AnswerBox>
            <p>정답 추가</p>
            <AddAnswerInputWrapper>
              <AddAnswerInput
                type="text"
                placeholder="내용을 입력해주세요."
                value={addAnswer}
                onChange={onChangeAddAnswer}
              />
              <CleanAddAnswer onClick={() => setAddAnswer('')}>&times;</CleanAddAnswer>
            </AddAnswerInputWrapper>
            <AddAnswerButtonBox>
              <AddAsnwerButton onClick={onClickAddAnswerButton}>
                <AddIcon />
                <p>답안추가</p>
              </AddAsnwerButton>
            </AddAnswerButtonBox>
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

  > label {
    display: flex;
    align-items: center;
    cursor: pointer;

    > p {
      ${fontStyle};
      margin-left: 12px;
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

const SubmitResult = styled.p`
  ${fontStyle};
  color: #85c88a;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 24px 0 4px;
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
  border: 1px solid #bebebe;
  background: #feffff;
  color: #2e2e2e;
`;

const ConfirmButton = styled(Button)`
  background: #477feb;
  color: #fff;
`;

const AnswerBox = styled(Box)`
  width: 100%;
  margin-bottom: 24px;

  > p {
    ${fontStyle};
    color: #85c88a;
    margin: 8px;
  }
`;

const AddAnswerInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AddAnswerInput = styled.input`
  display: flex;
  width: 100%;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  padding: 16px;
  box-sizing: border-box;

  ${fontStyle};
  margin: 0;

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #a4a4a4;
  }
`;

const CleanAddAnswer = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
  border: none;
  background: transparent;
  color: #686868;
  font-size: 24px;
`;

const AddAnswerButtonBox = styled(Box)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  margin-top: 12px;
`;

const AddAsnwerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  cursor: pointer;
  border: none;
  background: transparent;

  > p {
    color: #757575;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
  }
`;
