import React from 'react';
import styled from 'styled-components';

type CursorProps = {
  imgSrc: string;
  top: string;
  left: string;
  time: number;
  width: string;
};

const Cursor = ({ imgSrc, top, left, time, width }: CursorProps) => {
  return <Image imgSrc={imgSrc} src={imgSrc} width={width} top={top} left={left} time={time} />;
};

const Image = styled.img<CursorProps>`
  position: absolute;
  width: ${(props) => props.width};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation: move ${(props) => props.time}s ease-in forwards;
  perspective: 1000px;
  z-index: 5;
  @keyframes move {
    0% {
      transform: translateY(0) scale(3) rotate(4deg) skewY(20deg);
    }
    100% {
      transform: translate(32vw, -45vh);
    }
  }
`;

export default Cursor;
