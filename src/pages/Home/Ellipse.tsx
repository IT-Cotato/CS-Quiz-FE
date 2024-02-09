import React from 'react';
import styled from 'styled-components';

type EllipseProps = {
  top: string;
  left: string;
  time: number;
};

const Ellipse = ({ top, left, time }: EllipseProps) => {
  return (
    <Image
      src="https://velog.velcdn.com/images/ea_st_ring/post/ed87f665-b5e7-46fb-b9ec-224d4343ce37/image.svg"
      top={top}
      left={left}
      time={time}
    />
  );
};

const Image = styled.img<EllipseProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation: move ${(props) => props.time}s linear infinite;
  z-index: 3;
  @keyframes move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translate(-40vw, -130vh);
    }
  }
`;

export default Ellipse;
