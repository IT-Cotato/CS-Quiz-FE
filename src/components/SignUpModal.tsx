import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUpModal = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <h3>가입 신청이 완료 되었습니다!</h3>
      <button onClick={navigateToHome}>홈 화면</button>
    </Container>
  );
};

export default SignUpModal;

const Container = styled.div`
  position: absolute;
  top: 50%;
  width: 540px !important;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 2px 8px 8px 2px #cecccc;
  h3 {
    color: ${({ theme }) => theme.color.green};
    font-family: NanumPen;
    font-size: 3rem;
    font-weight: 400;
    margin-bottom: 48px;
    margin-top: 0;
  }
  button {
    width: 140px;
    height: 48px;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: #259c2e;
    font-family: NanumSquareRound;
  }
`;
