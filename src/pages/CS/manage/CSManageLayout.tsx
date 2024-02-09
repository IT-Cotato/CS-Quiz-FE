import React, { ReactNode } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ArrowBack } from '@assets/arrow_back.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
  header: string;
  children: ReactNode;
}

const CSManageLayout = ({ header, children }: Props) => {
  const navigate = useNavigate();

  return (
    <CSManageWrapper>
      <BackButton width={24} height={24} onClick={() => navigate(-1)} />
      <CSManageHeader>
        <h3>{header}</h3>
      </CSManageHeader>
      {children}
    </CSManageWrapper>
  );
};

export default CSManageLayout;

const CSManageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: #eee;
`;

const BackButton = styled(ArrowBack)`
  position: absolute;
  left: 72px;
  top: 64px;
`;

const CSManageHeader = styled.div`
  margin: 80px 0 40px;

  > h3 {
    color: #1d1d1d;
    font-family: Inter;
    font-size: 32px;
    font-weight: 600;
  }
`;
