import React from 'react';
import styled from 'styled-components';
import sns from '@assets/sns.svg';

const Footer = () => {
  return (
    <Wrapper>
      <SNS src={sns} alt="Direct Icons For Our SNS" />
      {/* 각각 이미지 요소로 수정 필요 */}
      <InfoBox>
        <h3>Cotato 코테이토</h3>
        <Sub>
          <p>E-mail. 00000000@naver.com @copyright</p>
          <p>Cotato | 대학생 IT 연합 동아리 코테이토</p>
          <p>Cotato 2023 HomePage v1.0</p>
        </Sub>
      </InfoBox>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.lightBlue};
  width: 100%;
  height: 472px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const SNS = styled.img`
  width: 360px;
  margin-bottom: 60px;
  margin-top: 136px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin-top: 0;
    margin-bottom: 4px;
    font-weight: 300;
    font-size: 1rem;
    text-align: center;
  }
`;

const Sub = styled.div`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
    font-weight: 300;
    margin: 0;
    font-size: 0.8rem;
  }
`;
