import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as AddIcon } from '@assets/add_circle.svg';
import api from '@/api/api';
import useSWRImmutable from 'swr/immutable';
import { IQuizAdminScorer } from '@/typing/db';
import fetcher from '@utils/fetcher';

interface Props {
  quizId: string | null;
  quizType?: string;
}

const AddAnswer = ({ quizId, quizType }: Props) => {
  const { mutate } = useSWRImmutable<IQuizAdminScorer>(
    `/v1/api/quiz/cs-admin?quizId=${quizId}`,
    fetcher,
  );

  const [addAnswer, setAddAnswer] = useState('');

  const onChangeAddAnswer = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAddAnswer(e.target.value);
    },
    [addAnswer],
  );

  const onSubmitAddAnswer = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 주관식인 경우만
      if (quizType === 'SHORT_QUIZ') {
        api
          .post(
            '/v1/api/quiz/cs-admin/answer/add',
            {
              quizId: quizId,
              answer: addAnswer,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          )
          .then(() => {
            api
              .post('/v1/api/record/regrade', {
                quizId: quizId,
                newAnswer: addAnswer,
              })
              .then(() => {})
              .catch((err) => console.error(err));

            setAddAnswer('');
            mutate();
          })
          .catch((err) => console.error(err));
      }
    },
    [addAnswer],
  );

  return (
    <Form onSubmit={onSubmitAddAnswer}>
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
        <AddAsnwerButton type="submit">
          <AddIcon />
          <p>답안추가</p>
        </AddAsnwerButton>
      </AddAnswerButtonBox>
    </Form>
  );
};

export default React.memo(AddAnswer);

const Form = styled.form`
  width: 100%;

  > p {
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    margin: 8px 0;
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

  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  margin: 0;

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #a4a4a4;
  }
`;

const CleanAddAnswer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-45%);
  cursor: pointer;
  border: none;
  background: transparent;
  color: #686868;
  font-size: 24px;
`;

const AddAnswerButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  border-radius: 8px;
  background: #fff;
  padding: 8px;
  box-sizing: border-box;
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
