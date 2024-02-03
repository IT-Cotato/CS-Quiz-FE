import React, { useCallback } from 'react';
import DndContainer from './DndContainer';
import styled from 'styled-components';
import { ChoiceProps, ShortProps } from '@/typing/db';

type QuizType = ChoiceProps | ShortProps;

type Props = {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const Slides = ({ quiz, setQuiz, selected, setSelected }: Props) => {
  const addQuiz = useCallback(() => {
    setQuiz((prev) => [
      ...prev,
      {
        quiz_id: prev.length + 1,
        quiz_title: '제목',
        quiz_content: '내용',
        quiz_type: 'choice',
        quiz_answer: [
          {
            choice_num: 1,
            choice_content: '',
          },
        ],
        choices: [
          {
            choice_id: 1,
            choice_content: '',
          },
          {
            choice_id: 2,
            choice_content: '',
          },
          {
            choice_id: 3,
            choice_content: '',
          },
          {
            choice_id: 4,
            choice_content: '',
          },
        ],
        quiz_image_file: null,
        quiz_preview_url: null,
      },
    ]);
  }, [selected]);

  const deleteItem = useCallback(() => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (!result) return;
    // 이전 번호 선택
    setSelected(selected - 1);
    setQuiz((prev) => {
      // selected인 quiz을 삭제 후, id를 재정렬
      console.log(selected);
      const newPrev = [...prev];
      newPrev.splice(selected - 1, 1);
      // quiz_preview_url undefined일 경우에 대한 예외처리
      if (newPrev[selected - 2]?.quiz_preview_url) {
        URL.revokeObjectURL(newPrev[selected - 2].quiz_preview_url || '');
      }
      return newPrev.map((quiz, index) => ({ ...quiz, quiz_id: index + 1 }));
      // return prev
      //   .filter((quiz) => quiz.quiz_id !== selected)
      //   .map((quiz, index) => ({ ...quiz, quiz_id: index + 1 }));
    });
  }, [selected]);
  return (
    <Wrapper>
      {DndContainer(quiz, setQuiz, setSelected, selected)}
      <button
        style={{ background: '#477FEB', color: 'white' }}
        onClick={() => {
          if (quiz.length >= 10) {
            window.alert('슬라이드는 최대 10개까지만 추가할 수 있습니다.');
            return;
          }
          addQuiz();
        }}
      >
        슬라이드 추가
      </button>
      <button
        style={{ background: '#D2D2D2' }}
        onClick={() => {
          if (selected === 0) {
            window.alert('슬라이드를 선택해주세요.');
            return;
          }
          if (quiz.length === 1) {
            window.alert('슬라이드가 1개 이상이어야 합니다.');
            return;
          }
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
  width: 280px;
  height: fit-content;
  display: flex;
  flex-direction: column;
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
