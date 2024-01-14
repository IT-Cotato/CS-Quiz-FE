import React from 'react';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <Wrapper>
      <h3>마이페이지</h3>
      <InfoWrapper>
        <InfoItem>
          <p>아이디</p>
          <InfoBox>cotato@gmail.com</InfoBox>
        </InfoItem>
        <InfoItem>
          <p>비밀번호</p>
          <InfoBox style={{ paddingTop: '8px' }}>
            **********
            <button>수정</button>
          </InfoBox>
        </InfoItem>
        <InfoItem>
          <p>이름</p>
          <InfoBox>김감자</InfoBox>
        </InfoItem>
        <InfoItem>
          <p>합격 기수</p>
          <InfoBox>8기</InfoBox>
        </InfoItem>
        <InfoItem>
          <p>전화번호</p>
          <InfoBox>010-1234-5678</InfoBox>
        </InfoItem>
        <InfoItem>
          <p>포지션</p>
          <InfoBox>프론트엔드</InfoBox>
        </InfoItem>
      </InfoWrapper>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  h3 {
    font-size: 1.5rem;
    margin-bottom: 56px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  p {
    font-size: 1rem;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 4px;
    padding-bottom: 4px;
  }
`;

const InfoBox = styled.div`
  width: 600px;
  height: 52px;
  border-radius: 10px;
  border: 2px solid #d7e5ca;
  background: #fff;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  font-size: 1rem;
  button {
    width: 52px;
    height: 28px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    background: #f1f1f1;
    font-family: Inter;
    font-size: 0.8rem;
    color: #7c7c7c;
    font-weight: 400;
    margin-right: 20px;
    margin-bottom: 6px;
  }
`;
