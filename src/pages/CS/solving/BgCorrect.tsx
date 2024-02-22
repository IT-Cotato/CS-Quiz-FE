import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import background from '@assets/bg_correct.svg';
import mobile from '@assets/bg_correct_mobile.svg';
import check from '@assets/check_icon.svg';

const BgCorrect = () => {
  const preloadImg = () => {
    const bgImg = new Image();
    const checkImg = new Image();
    bgImg.src = background;
    checkImg.src = check;
  };

  useLayoutEffect(() => {
    preloadImg();
  }, []);

  return (
    <Wrapper>
      <p>정답입니다!</p>
      <Check src={check} />
    </Wrapper>
  );
};

export default BgCorrect;

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

  @keyframes fade_out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  animation: fade_out 1s ease-in-out 1.5s;
  animation-fill-mode: forwards;

  @media screen and (max-width: 392px) {
    background: url(${mobile});
    padding-top: 200px;
    p {
      font-size: 2rem;
    }
  }
`;

const Check = styled.img`
  width: 200px;
  transform-origin: bottom left;
  transform: rotate(-45deg), scale(0);
  transition: transform 0.5s ease-in-out;

  @media screen and (max-width: 392px) {
    width: 100px;
  }
`;
