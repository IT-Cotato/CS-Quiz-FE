import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Multiples, ShortQuizzes } from '@/typing/db';

type Props = {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

type QuizType = Multiples | ShortQuizzes;
const MobileSlides = ({ quiz, setQuiz, selected, setSelected }: Props) => {
  const [isDown, setIsDown] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const selectedRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLImageElement>(null);
  const slideBottomDistance = selectedRef.current?.getBoundingClientRect().bottom;
  const menuBottomDistance = menuRef.current?.getBoundingClientRect().bottom;
  const menuRightDistance = menuRef.current?.getBoundingClientRect().right;
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

  const onClickBack = useCallback(() => {
    window.history.back();
  }, []);

  const addQuiz = useCallback(() => {
    if (quiz.length >= 10) {
      window.alert('슬라이드는 최대 10개까지만 추가할 수 있습니다.');
      return;
    }
    setQuiz((prev) => [
      ...prev,
      {
        number: prev.length + 1,
        question: '제목',
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
    setIsShow(false);
  }, [selected]);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setQuiz((prev) => {
        const newPrev = [...prev];
        newPrev[selected].question = e.target.value;
        return [...newPrev];
      });
    },
    [selected],
  );

  const onClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsShow(false);
      }
    },
    [menuRef],
  );

  return (
    <Wrapper onClick={onClickOutside}>
      <Navbar>
        <div onClick={onClickBack}>
          <img
            src="https://velog.velcdn.com/images/ea_st_ring/post/fa66daa9-ddeb-4ca5-894c-5fa5f38a0340/image.svg"
            style={{ transform: 'rotate(90deg)', cursor: 'pointer' }}
          />{' '}
        </div>
        <div onClick={() => setIsShow(!isShow)} style={{ zIndex: 99 }}>
          <img
            src="https://velog.velcdn.com/images/ea_st_ring/post/cb0f63b2-1ab2-4a8c-8519-9c7d84d7a502/image.svg"
            style={{ cursor: 'pointer' }}
            ref={menuRef}
          />
        </div>
      </Navbar>
      {isShow && (
        <Modal $top={menuBottomDistance} $right={menuRightDistance}>
          <div onClick={deleteItem}>
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/9dda46cf-266e-4c49-b257-928527f652bc/image.svg" />
            <p>삭제</p>
          </div>
          <div onClick={addQuiz}>
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/befacb9b-cc83-485b-9a2c-83c8e921aa23/image.svg" />
            <p>추가</p>
          </div>
        </Modal>
      )}
      <Dropdown>
        <SelectButton onClick={() => setIsDown(!isDown)} ref={selectedRef}>
          <p>{selected + 1}</p>
          <label>
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/fa66daa9-ddeb-4ca5-894c-5fa5f38a0340/image.svg" />{' '}
          </label>
        </SelectButton>
        <Opitons $top={slideBottomDistance}>
          {isDown &&
            quiz.map((item) => (
              <div
                key={item.number}
                onClick={() => {
                  setIsDown(false);
                  setSelected(item.number - 1);
                }}
              >
                {item.number}
              </div>
            ))}
        </Opitons>
      </Dropdown>
      <Title
        onChange={onChangeTitle}
        value={quiz[selected]?.question || ''}
        placeholder="문제 제목을 입력해주세요."
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    background: #f4f4f4;
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
  div {
    width: 40px;
    padding: 0px;
    height: 30px;
    img {
      padding: 0px 20px;
    }
  }
`;

const Title = styled.textarea`
  width: 100%;
  height: 55px;
  padding: 0 20px;
  border: none;
  box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
  -webkit-box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
  resize: none;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard';
  display: flex;
  justify-content: center;
  align-items: center;
  &::placeholder {
    text-align: center;
  }
  &:focus {
    outline: none;
  }
`;

const Dropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: fit-content;
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: #e4ecfd;
  text-align: center;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
  -webkit-box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
`;

const Opitons = styled.div<any>`
  position: absolute;
  width: 200px;
  height: fit-content;
  top: ${(props) => props.$top}px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 20px;
  div {
    width: 200px;
    height: 50px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #e4ecfd;
    &:hover {
      background-color: #c4d7ff;
    }
  }
`;

const SelectButton = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    position: relative;
    left: 10px;
  }
  label {
    position: relative;
    left: 65px;
  }
`;

const Modal = styled.div<any>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: ${(props) => props.$top + 10}px;
  left: ${(props) => props.$right - 180}px;
  div {
    width: 180px;
    height: 50px;
    padding: 0 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    &:hover {
      background-color: #c4d7ff;
    }
  }
  img {
    margin-right: 20px;
  }
`;

export default MobileSlides;
