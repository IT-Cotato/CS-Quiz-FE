import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowBack } from '@/assets/arrow_back.svg';

interface CSAdminUploadLayoutProps {
  children: React.ReactNode;
  generationId: string;
  educationNumber: string;
}

const CSAdminUploadLayout: React.FC<CSAdminUploadLayoutProps> = ({
  children,
  generationId,
  educationNumber,
}) => {
  return (
    <Wrapper>
      <TitleBox>
        <BackButton
          onClick={() => {
            const confirm = window.confirm('저장하지 않고 나가면 변경사항이 사라질 수 있어요!');
            if (confirm) {
              window.history.back();
            }
          }}
        />
        <h1>CS 문제업로드</h1>
        <p>{`${generationId}기 / ${educationNumber}차 세션`}</p>
      </TitleBox>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 20px 120px;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const BackButton = styled(ArrowBack)`
  width: 25px;
  height: 25px;
  align-self: center;
  margin: 0px 0 0 0px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 40px 0px;
  h1 {
    font-size: 32px;
    margin-right: 16px;
  }
  p {
    font-size: 16px;
    font-weight: 700;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default CSAdminUploadLayout;
