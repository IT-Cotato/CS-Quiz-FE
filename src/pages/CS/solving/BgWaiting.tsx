import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Timer } from '@assets/timer.svg';
import background from '@assets/bg_waiting.svg';

type Props = {
  quizNum?: number;
  setShowKingKing?: (value: boolean) => void;
};

const BgWaiting = ({ quizNum, setShowKingKing }: Props) => {
  console.log('quizNum', quizNum);
  useEffect(() => {
    if (setShowKingKing && quizNum === 10) {
      setShowKingKing(true);
      setTimeout(() => {
        setShowKingKing(false);
      }, 5000);
    }
  }, []);

  return (
    <Wrapper>
      <Waiting>
        <Timer style={{ width: '68px' }} />
        <div>곧 문제가 시작됩니다. &nbsp;잠시만 기다려주세요!</div>
      </Waiting>
    </Wrapper>
  );
};

export default BgWaiting;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding-bottom: 40px;
  background-size: cover;
  position: absolute;
  position: fixed;
  z-index: 10;
  overflow: auto;
  top: 0;
  right: 0;
  left: 0;

  animation: slide_down 2s ease-in-out;
  @keyframes slide_down {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slide_up {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

const Waiting = styled.div`
  background: url(${background});
  background-size: cover;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  div {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 680px;
    height: 80px;
    border-radius: 19px;
    background: #fff;
    color: #477feb;
    font-family: NanumSquareRound;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
