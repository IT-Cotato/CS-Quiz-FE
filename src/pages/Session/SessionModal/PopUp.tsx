import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface Props {
  closePopUp: () => void;
  text: string;
}

const PopUp = ({ closePopUp, text }: Props) => {
  const popUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target as Node)) {
        closePopUp();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [popUpRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      closePopUp();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PopUpWrapper ref={popUpRef}>
      <p>{text}</p>
    </PopUpWrapper>
  );
};

export default PopUp;

const PopUpWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 416px;
  height: 120px;
  border-radius: 10px;
  border: 3px solid #cecccc;
  background: #f6f9ff;
  display: flex;
  align-items: center;
  justify-content: center;

  > p {
    color: #000;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
