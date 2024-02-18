import React from 'react';
import styled from 'styled-components';

type EllipseProps = {
  top: string;
  left: string;
  time: number;
  width?: string;
  height?: string;
  delay?: number;
  src?: string;
};

const Ellipse = ({ top, left, time, width, height, src }: EllipseProps) => {
  return (
    <Image
      src={
        src ||
        'https://velog.velcdn.com/images/ea_st_ring/post/79c49a08-8315-4b9c-9914-f07fba77628c/image.svg'
      }
      top={top}
      left={left}
      time={time}
      width={width}
      height={height}
    />
  );
};

const Image = styled.img<EllipseProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  animation: float ${(props) => props.time}s linear infinite;
  animation-delay: ${(props) => props.delay}s;
  z-index: 3;
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(3vh);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default Ellipse;
