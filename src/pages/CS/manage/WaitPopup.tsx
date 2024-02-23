import React from 'react';
import { styled } from 'styled-components';

interface Props {
  isOpen: boolean;
}

const WaitPopup = ({ isOpen }: Props) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <Overlay>
      <PopupContainer>
        <p>문제 풀이를 시작하는중...</p>
      </PopupContainer>
    </Overlay>
  );
};

export default WaitPopup;

const Overlay = styled.div`
  z-index: 1;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  max-width: 800px;
  width: 80%;
  height: 160px;
  border-radius: 10px;
  background: #f6f9ff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
  padding-left: 24px;

  > p {
    color: #222;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
