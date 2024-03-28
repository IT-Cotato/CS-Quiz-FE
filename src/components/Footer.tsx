import React from 'react';
import styled from 'styled-components';
import sns from '@assets/sns.svg';

const Footer = () => {
  const totalHeight = document.documentElement.scrollHeight;
  return (
    <Wrapper totalHeight={totalHeight}>
      <SNS>
        <img
          src="https://velog.velcdn.com/images/ea_st_ring/post/b61b073b-ebed-46dc-af51-09eb33237848/image.svg"
          alt="insta-logo"
          onClick={() => {
            window.open('https://www.instagram.com/cotato_official_?igsh=aDh2ZGZqazBpMmtp');
          }}
        />
        <img
          src="https://velog.velcdn.com/images/ea_st_ring/post/3eae2443-4962-466d-ac18-316b6ed08126/image.svg"
          alt="notion-logo"
        />
        <img
          src="https://velog.velcdn.com/images/ea_st_ring/post/17f322e6-ae85-47de-bf4d-d70e5dce9051/image.svg"
          alt="git-logo"
          onClick={() => {
            window.open('https://github.com/IT-Cotato');
          }}
        />
        <img
          src="https://velog.velcdn.com/images/ea_st_ring/post/21f869d1-3c7f-4703-ac65-d3458e74c1ed/image.svg"
          alt="cafe-logo"
          onClick={() => {
            window.open('https://cafe.naver.com/cotato');
          }}
        />
      </SNS>
      {/* 각각 이미지 요소로 수정 필요 */}
      <InfoBox>
        <h3>Cotato 코테이토</h3>
        <Sub>
          <p>E-mail. itcotato@gmail.com</p>
          <p>@copyright Cotato | 대학생연합 IT동아리 코테이토</p>
          <p>Cotato 2023 HomePage v1.0</p>
        </Sub>
      </InfoBox>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div<{ totalHeight: number }>`
  background-color: ${({ theme }) => theme.color.lightBlue};
  width: 100%;
  height: 472px;
  padding: 120px 200px 60px 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  @media screen and (max-width: 768px) {
    padding: 60px 20px 20px 20px;
  }
`;

const SNS = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
  margin-bottom: 60px;
  img {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  img:hover {
    transform: rotate(15deg);
  }
  @media screen and (max-width: 768px) {
    img {
      width: 60px;
    }
  }
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
