import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Wrapper>
      <img src="https://velog.velcdn.com/images/ea_st_ring/post/c5bc895f-888d-4a0f-8c72-b64300852286/image.svg" />
      <h1>요청하신 페이지를 찾을 수 없습니다.</h1>
      <button
        onClick={() => {
          window.location.href = '/';
        }}
      >
        홈 화면으로 이동하기
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 60px;
  }
  h1 {
    color: #bbb;
    font-family: NanumSquareRound;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
  }
  button {
    display: flex;
    padding: 12px 32px;
    justify-content: center;
    margin-top: 24px;
    font-size: 18px;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    background-color: #1e1e1e;
    color: #fff;
    cursor: pointer;
  }
`;

export default NotFound;
