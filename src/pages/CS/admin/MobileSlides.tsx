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
    setIsShow(false);
  }, [selected]);

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
        <Modal top={menuBottomDistance} right={menuRightDistance}>
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
