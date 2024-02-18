import React, { useCallback } from 'react';
import DndContainer from './DndContainer';
import styled from 'styled-components';
import { Multiples, ShortQuizzes } from '@/typing/db';

type QuizType = Multiples | ShortQuizzes;

type Props = {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const Slides = ({ quiz, setQuiz, selected, setSelected }: Props) => {
  const addQuiz = useCallback(() => {
    if (quiz.length >= 10) {
      window.alert('슬라이드는 최대 10개까지만 추가할 수 있습니다.');
      return;
    }
    setQuiz((prev) => [
      ...prev,
      {
        number: prev.length + 1,
        question: '',
        choices: [
          {
            number: 1,
            content: '',
            isAnswer: 'NO_ANSWER',
          },
          {
            number: 2,
            content: '',
            isAnswer: 'NO_ANSWER',
          },
          {
            number: 3,
            content: '',
            isAnswer: 'NO_ANSWER',
          },
          {
            number: 4,
            content: '',
            isAnswer: 'NO_ANSWER',
          },
        ],
        image: null,
        previewUrl: null,
      },
    ]);
  }, [quiz, selected]);

  const deleteItem = useCallback(() => {
    if (quiz.length === 1) {
      window.alert('슬라이드가 1개 이상이어야 합니다.');
      return;
    }
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (!result) return;
    // 이전 번호 선택
    if (selected === 0) {
      setSelected(0);
    } else {
      setSelected(selected - 1);
    }
    setQuiz((prev) => {
      // selected인 quiz을 삭제 후, id를 재정렬
      const newPrev = [...prev];
      newPrev.splice(selected, 1);
      // previewUrl undefined일 경우에 대한 예외처리
      if (newPrev[selected - 2]?.previewUrl) {
        URL.revokeObjectURL(newPrev[selected - 2].previewUrl || '');
      }
      return newPrev.map((quiz, index) => ({ ...quiz, number: index + 1 }));
    });
  }, [selected]);
  return (
    <Wrapper>
      {DndContainer(quiz, setQuiz, setSelected, selected)}
      <button
        style={{ background: '#477FEB', color: 'white' }}
        onClick={() => {
          addQuiz();
        }}
      >
        슬라이드 추가
      </button>
      <button
        style={{ background: '#D2D2D2' }}
        onClick={() => {
          deleteItem();
        }}
      >
        슬라이드 삭제
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: leftbox;
  /* width: 280px; */
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  button {
    width: 200px;
    height: 48px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    background: ${(props: any) => (props.isselected === 'true' ? '#C4D7FF' : '#E4ECFD')};
    & + button {
      margin-top: 16px;
    }
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default Slides;
