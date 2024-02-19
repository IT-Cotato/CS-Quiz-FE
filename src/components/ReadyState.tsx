import React from 'react';
import styled from 'styled-components';

const ReadyState = () => {
  return (
    <Wrapper>
      <img src="https://velog.velcdn.com/images/ea_st_ring/post/34acf66f-e31c-466a-ad2f-faddb3c3679f/image.svg" />
      <h1>페이지 준비중입니다. 조만간 뵙겠습니다.</h1>
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
    color: #595959;
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

export default ReadyState;
