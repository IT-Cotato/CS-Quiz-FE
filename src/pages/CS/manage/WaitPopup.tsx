import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface Props {
  isOpen: boolean;
}

const WaitPopup = ({ isOpen }: Props) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [popupRef]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <PopupContainer ref={popupRef}>
      <p>문제 풀이를 시작하는중...</p>
    </PopupContainer>
  );
};

export default WaitPopup;

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
