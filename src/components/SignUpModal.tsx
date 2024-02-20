import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import congrat from '@assets/congrat.svg';

const SignUpModal = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <img src={congrat} alt="폭죽 아이콘" />
      <h3>회원가입 신청이 완료되었습니다!</h3>
      <p>신입 감자가 되신 것을 환영합니다!</p>
      <button onClick={navigateToHome}>홈 화면으로 가기</button>
    </Container>
  );
};

export default SignUpModal;

const Container = styled.div`
  position: absolute;
  top: 50%;
  width: 640px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.color.darkGrey};
  img {
    width: 68px;
    margin-bottom: 28px;
  }
  h3 {
    color: #259c2e;
    font-family: NanumSquareRound;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0 !important;
    margin-top: 0;
  }
  p {
    color: ${({ theme }) => theme.color.darkGrey};
    font-family: NanumSquareRound;
    font-size: 0.9rem;
    font-weight: 400;
  }
  button {
    width: 360px;
    height: 48px;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 12px;
    margin-top: 28px;
    background-color: ${({ theme }) => theme.color.green};
    color: #fff;
    font-family: NanumSquareRound;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 480px;
  }
  @media screen and (max-width: 392px) {
    width: 320px;
    height: 240px;
    img {
      width: 48px;
      margin-bottom: 16px;
    }
    h3 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.8rem;
      margin-top: 8px;
    }
    button {
      width: 240px;
      height: 40px;
      font-size: 0.9rem;
      margin-top: 16px;
    }
  }
`;
