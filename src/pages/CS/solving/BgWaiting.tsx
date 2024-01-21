import React from 'react';
import styled from 'styled-components';
import background from '@assets/bg_waiting.svg';
import { ReactComponent as Timer } from '@assets/timer.svg';

const BgWaiting = () => {
  return (
    <Wrapper>
      <Timer style={{ width: '68px' }} />
      <div>곧 문제가 시작됩니다. &nbsp;잠시만 기다려주세요!</div>
    </Wrapper>
  );
};

export default BgWaiting;

const Wrapper = styled.div`
  background: url(${background});
  background-size: cover;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  position: fixed;
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
  animation:
    slide_down 1s ease-in-out,
    slide_up 2s ease-in-out 5s;
  animation-fill-mode: forwards;
`;
