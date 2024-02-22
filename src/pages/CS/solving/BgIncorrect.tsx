import React from 'react';
import styled from 'styled-components';
import background from '@assets/bg_incorrect.svg';
import mobile from '@assets/bg_incorrect_mobile.svg';
import x from '@assets/x.svg';

const BgIncorrect = () => {
  return (
    <Wrapper>
      <p>오답입니다!</p>
      <X src={x} />
    </Wrapper>
  );
};

export default BgIncorrect;

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
  top: 0;
  left: 0;
  p {
    color: #222;
    font-family: NanumSquareRound;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }

  /* @keyframes slide_down {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  } */
  @keyframes fade_out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  animation:
    /* slide_down 1s ease-in-out, */ fade_out 1s ease-in-out 1.5s;
  animation-fill-mode: forwards;

  @media screen and (max-width: 392px) {
    background: url(${mobile});
    padding-top: 200px;
    p {
      font-size: 2rem;
    }
  }
`;

const X = styled.img`
  width: 200px;

  @media screen and (max-width: 392px) {
    width: 100px;
  }
`;
