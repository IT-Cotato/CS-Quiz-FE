import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const CSMain = () => {
  // 초기 진입 시 role을 구분할 방법 정하기

  const location = useLocation();
  const search = location.search;
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];

  const role = 'admin';

  return (
    <Background>
      <TitleBox>
        <h1>COTATO</h1>
        <h3>CS 문제풀이</h3>
        <p>{`${generation}기 / ${week}차 세션`}</p>
      </TitleBox>
      <NavBox>
        <StartButton>
          <img src="https://velog.velcdn.com/images/ea_st_ring/post/bd736447-90ff-4a0a-b777-7730ef34ba94/image.svg" />
          &nbsp;
          <p> 문제풀이 시작하기</p>
        </StartButton>
        <BackButton>
          <img src="https://velog.velcdn.com/images/ea_st_ring/post/f5fd7a4a-eeb4-4bce-937a-3b745bd8d66b/image.svg" />
          &nbsp;
          <p
            onClick={() => {
              window.location.href = '/cs';
            }}
          >
            이전세션 선택하기
          </p>
        </BackButton>
        {role === 'admin' ? (
          <>
            <UploadButton>
              <p>문제 업로드</p>
            </UploadButton>
            <ManageButton>
              <p>문제풀이 관리</p>
            </ManageButton>
          </>
        ) : null}
      </NavBox>
    </Background>
  );
};

const Background = styled.div`
  background: url('https://velog.velcdn.com/images/ea_st_ring/post/449d6100-8096-4c15-9995-5d3bf01ad48a/image.svg');
  background-size: cover;
  width: 100%;
  min-height: 100vh !important;
  height: fit-content;
  box-sizing: border-box;
  padding: 70px 100px 0px 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const TitleBox = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  color: #fff;
  h1 {
    font-family: Mogra;
    font-size: 96px;
    font-weight: 400;
    margin-bottom: 0;
  }
  h3 {
    font-family: NanumSquareRound;
    font-size: 28px;
    margin: 12px 0 4px 0;
    font-weight: 800;
  }
  p {
    font-family: NanumSquareRound;
    font-size: 16px;
    margin-top: 8px;
    font-weight: 800;
  }
`;

const NavBox = styled.div`
  width: 40%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px;
  background-color: #fff;
  padding: 60px 40px;
  margin-top: 36px;
  margin-bottom: 24px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NanumSquareRound;
    font-size: 18px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: none;
    transition: 0.2s;
  }

  button + button {
    margin-top: 24px;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const StartButton = styled.button`
  background: #484848;
  color: #fdfdfd;
`;

const BackButton = styled.button`
  background: #e8e8e8;
  color: #000;
`;

const UploadButton = styled.button`
  background: transparent;
  color: #000;
  border: 2px dashed #9cbefd !important;
`;

const ManageButton = styled.button`
  background: transparent;
  color: #000;
  border: 2px dashed #9cbefd !important;
`;

export default CSMain;
