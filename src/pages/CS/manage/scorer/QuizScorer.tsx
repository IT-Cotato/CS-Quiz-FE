import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CSManageLayout from '@pages/CS/manage/CSManageLayout';
import { css, styled } from 'styled-components';
import { IQuizAdminScorer } from '@/typing/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import AddAnswer from '@pages/CS/manage/scorer/AddAnswer';

const submitList = [
  { id: 1, name: '조원영', phone: 1111, record: 1 },
  { id: 2, name: '조원영', phone: 2222, record: 2 },
  { id: 3, name: '조원영', phone: 3333, record: 3 },
  { id: 4, name: '조원영', phone: 4444, record: 4 },
  { id: 5, name: '조원영', phone: 5555, record: 1 },
  { id: 6, name: '조원영', phone: 6666, record: 2 },
];

const QuizScorer = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');

  const { data: quiz, mutate } = useSWR<IQuizAdminScorer>(
    `/v1/api/quiz/cs-admin?quizId=${quizId}`,
    fetcher,
  );
  const [scorer, setScorer] = useState({ id: 1, name: '조원영', phone: 1111 });
  const [checkedScorer, setCheckedScorer] = useState(scorer);

  const onChangeRadio = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newScorer = submitList.find((element) => element.id === parseInt(e.target.value));
    if (newScorer) setCheckedScorer(newScorer);
  }, []);

  const onClickChangeButton = useCallback(() => {
    setScorer(checkedScorer);
  }, [scorer, checkedScorer]);

  const onClickConfirmButton = useCallback(() => {}, []);

  const mutateAddAnswer = useCallback((addAnswer: string) => {
    quiz?.answer.push(addAnswer);
    mutate(quiz);
  }, []);

  return (
    <CSManageLayout header="CS 문제별 득점자 확인">
      <QuizScorerWrapper>
        <TitleWrapper>
          <p className="quiz-number">문제{quiz?.quizNumber}</p>
          <p className="question">{quiz?.question}</p>
        </TitleWrapper>
        <ColumnDivision>
          {/* 분리 필요? */}
          <HalfContainer width="55%">
            <p>제출 순 나열</p>
            <SubmitBox>
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
              {quiz?.answer.map((ans, idx) => (
                <p key={idx}>
                  {ans}
                  {quiz.quizType === 'MULTIPLE_QUIZ' && '번'}
                </p>
              ))}
            </AnswerBox>
            <AddAnswer quizId={quizId} mutateAddAnswer={mutateAddAnswer} />
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
  display: block;
  width: 100%;
  margin-bottom: 24px;

  > p {
    ${fontStyle};
    color: #85c88a;
    margin: 8px;
  }
`;
