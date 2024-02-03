import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChoiceProps, ShortProps } from '@/typing/db';

type Props = {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

type QuizType = ChoiceProps | ShortProps;
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
      alert('슬라이드가 1개 이상이어야 합니다.');
      return;
    }
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (!result) return;
    // 이전 번호 선택
    setSelected(selected - 1);
    setQuiz((prev) => {
      // selected인 quiz을 삭제 후, id를 재정렬
      const newPrev = [...prev];
      newPrev.splice(selected - 1, 1);
      // quiz_preview_url undefined일 경우에 대한 예외처리
      if (newPrev[selected - 2]?.quiz_preview_url) {
        URL.revokeObjectURL(newPrev[selected - 2].quiz_preview_url || '');
      }
      return newPrev.map((quiz, index) => ({ ...quiz, quiz_id: index + 1 }));
    });
    setIsShow(false);
  }, [selected]);

  return (
    <Wrapper>
      <Navbar>
        <div>
          <img
            src="https://velog.velcdn.com/images/ea_st_ring/post/fa66daa9-ddeb-4ca5-894c-5fa5f38a0340/image.svg"
            style={{ transform: 'rotate(90deg)', cursor: 'pointer' }}
          />{' '}
        </div>
        <div onClick={() => setIsShow(!isShow)}>
          <img
            src="https://velog.velcdn.com/images/ea_st_ring/post/cb0f63b2-1ab2-4a8c-8519-9c7d84d7a502/image.svg"
            style={{ cursor: 'pointer' }}
            ref={menuRef}
          />
        </div>
      </Navbar>
      {isShow && (
        <Modal top={menuBottomDistance} right={menuRightDistance}>
          <div onClick={deleteItem}>
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/4fbd5754-4c51-440b-9ca6-098f5c3a5fd0/image.svg" />
            <p>삭제</p>
          </div>
          <div>
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/a228849c-a89b-4ed7-96c2-09fb6e16756a/image.svg" />
            <p>저장</p>
          </div>
        </Modal>
      )}
      <Dropdown>
        <SelectButton onClick={() => setIsDown(!isDown)} ref={selectedRef}>
          <p>{selected}</p>
          <label>
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/fa66daa9-ddeb-4ca5-894c-5fa5f38a0340/image.svg" />{' '}
          </label>
        </SelectButton>
        <Opitons top={slideBottomDistance}>
          {isDown &&
            quiz.map((item) => (
              <div
                key={item.quiz_id}
                onClick={() => {
                  setIsDown(false);
                  setSelected(item.quiz_id);
                }}
              >
                {item.quiz_id}
              </div>
            ))}
        </Opitons>
      </Dropdown>
      <Title placeholder="질문을 입력하세요" />
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
    width: 20px;
    padding: 0 20px;
    height: 30px;
    cursor: pointer;
  }
`;

const Title = styled.input`
  width: 100%;
  height: 55px;
  padding: 0 20px;
  border: none;
  box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
  -webkit-box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 10px 10px -9px rgba(0, 0, 0, 0.47);
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
  top: ${(props) => props.top}px;
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
  top: ${(props) => props.top + 10}px;
  left: ${(props) => props.right - 180}px;
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
