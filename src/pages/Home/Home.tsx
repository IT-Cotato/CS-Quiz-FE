import React, { useEffect } from 'react';
import styled from 'styled-components';
import Ellipse from './Ellipse';
import Cursor from './Cursor';

const Home = () => {
  const body: any = document.querySelector('body');
  body.style.overflowX = 'hidden';

  // 새로고침마다 오른쪽으로 스크롤이 이동하는 버그 방지
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);

  return (
    <Wrapper>
      <Ground>
        <Cursor
          imgSrc="https://velog.velcdn.com/images/ea_st_ring/post/c8fcef9e-6162-44a5-a828-6facd5e193e8/image.svg"
          top={'90vh'}
          left={'40%'}
          time={30}
          width={'250px'}
        />
        <Cursor
          imgSrc="https://velog.velcdn.com/images/ea_st_ring/post/e87ff3e2-5d58-42f9-8b45-121952a18697/image.svg"
          top={'100vh'}
          left={'80%'}
          time={15}
          width={'300px'}
        />
        <Ellipse top={'100vh'} left={'85%'} time={10} />
        <Ellipse top={'100vh'} left={'13%'} time={6} />
        <Ellipse top={'100vh'} left={'53%'} time={13} />
        <Ellipse top={'90vh'} left={'99%'} time={5.5} />
        <TwoEllipse src="https://velog.velcdn.com/images/ea_st_ring/post/42de9f26-69ba-4fbd-9e30-5d3d8c3eabd9/image.svg" />
        <BigEllipse src="https://velog.velcdn.com/images/ea_st_ring/post/ed87f665-b5e7-46fb-b9ec-224d4343ce37/image.svg" />
        <TextBox>
          <h2>IT 연합동아리 코테이토</h2>
          <h1>COTATO</h1>
          <p>Coding</p>
          <p> Potatoes</p>
          <button>지원하기</button>
        </TextBox>
      </Ground>
      <Div></Div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ground = styled.div`
  width: 100vw;
  max-width: 100vw;
  min-height: 80%;
  background-color: #f9faff;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  z-index: 10;
  h1 {
    color: #212121;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Noto Sans';
    font-size: 86px;
    margin: 0;
    z-index: 10;
  }
  h2 {
    z-index: 10;
  }
  h3 {
    color: #292929;
    text-align: center;
    font-family: 'Nanum Gothic';
    font-size: 24px;
    font-weight: 700;
    z-index: 10;
  }
  p {
    color: #404040;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Noto Sans';
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 3.12px;
    margin: 0;
    z-index: 10;
  }

  button {
    width: 200px;
    height: 50px;
    margin-top: 48px;
    border: none;
    border-radius: 20px;
    background: #5ef4f0;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    z-index: 10;
    cursor: pointer;
    transition: 0.1s;
  }
  button:hover {
    transform: scale(1.02);
  }
`;

const TwoEllipse = styled.img`
  position: absolute;
  width: 300px;
  top: 70vh;
  left: 5%;
  z-index: 1;
  animation: float 1s;
  @keyframes float {
    0% {
      transform: translateY(30vh);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const BigEllipse = styled.img`
  position: absolute;
  width: 400px;
  top: 65vh;
  left: 85%;
  z-index: 1;
  animation: float 1.5s ease;
  @keyframes float {
    0% {
      transform: translateY(30vh);
    }
    50% {
      transform: translateY(30vh);
    }
    100% {
      transform: translateY(0vh);
    }
  }
`;

const Div = styled.div`
  width: 100%;
  height: 60%;
  background-color: #fff;
  z-index: 10;
`;

export default Home;
