import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const AnimatedText = () => {
  const [line1, setLine1] = useState([
    'C',
    'O',
    'd',
    'e',
    ' ',
    'T',
    'o',
    'g',
    'e',
    't',
    'h',
    'e',
    'r',
    ',',
  ]);
  const [line2, setLine2] = useState([
    'A',
    'r',
    'r',
    'i',
    'v',
    'e',
    ' ',
    'T',
    'O',
    'g',
    'e',
    't',
    'h',
    'e',
    'r',
    '!',
  ]);
  const spaces = [0, 0, -105, -94, -276, -277];
  const checkUpper = (char: string) => {
    return char === char.toUpperCase() && char.match(/[a-zA-Z]/);
  };

  const animDelay = 3; // 최소 2

  return (
    <Box $anim_delay={animDelay}>
      <Line1>
        {line1.map((char, idx) =>
          checkUpper(char) ? (
            <UpperChar key={idx} $anim_delay={animDelay} top={0} left={spaces.shift() || 0}>
              {char}
            </UpperChar>
          ) : (
            <span key={idx} className={checkUpper(char) ? '' : 'animated-char'}>
              {char === ' ' ? <>&nbsp;</> : char}
            </span>
          ),
        )}
      </Line1>
      <br />
      <Line2 $anim_delay={animDelay}>
        {line2.map((char, idx) =>
          checkUpper(char) ? (
            <UpperChar key={idx} $anim_delay={animDelay} top={-103} left={spaces.shift() || 0}>
              {char}
            </UpperChar>
          ) : (
            <span key={idx} className={checkUpper(char) ? '' : 'animated-char'}>
              {char === ' ' ? <>&nbsp;</> : char}
            </span>
          ),
        )}
      </Line2>
      <div className="typing-text">Who&apos;s the next potato?</div>
      <div className="join-button">
        <p
          onClick={() => {
            window.location.replace('/joinus');
          }}
        >
          JOIN US
        </p>
        <img src="https://velog.velcdn.com/images/ea_st_ring/post/d8c89c23-9f33-4d79-94fa-7949216030d4/image.svg" />
      </div>
    </Box>
  );
};

const Box = styled.div<{ $anim_delay: number }>`
  transition: 2s;
  cursor: default;
  .animated-char {
    /* opacity: 0; */
    animation: fadeOut 1s ${(props) => props.$anim_delay - 1}s ease-in forwards;
    visibility: visible;
  }
  z-index: 10;
  span {
    z-index: 10;
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
      visibility: visible;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  .typing-text {
    width: 18.5ch;
    animation:
      fadeIn 4s ${(props) => props.$anim_delay}s forwards,
      typing 2s ${(props) => props.$anim_delay}s steps(24),
      blink 0.5s ${(props) => props.$anim_delay}s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    font-size: 1.8em;
    opacity: 0;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translateY(-80px);
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
  .join-button {
    width: 180px;
    display: flex;
    justify-content: center;
    padding: 8px 10px;
    transition: 0.5s;
    align-items: center;
    animation: leftToRight 3s ${(props) => props.$anim_delay + 2}s forwards;
    opacity: 0;
    cursor: pointer;
    p {
      color: #fff;
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 1.12px;
      transition: 0.2s;
      margin-right: 20px;
    }
    img {
      margin-top: 1px;
      transition: 0.6s;
      transform: translateX(-10px);
    }
    &:hover {
      width: 200px;
      background-color: #2c28c5;
      border-radius: 25px;
      p {
      }
      img {
        transform: translateX(-5px);
      }
    }
  }
  @keyframes leftToRight {
    0% {
      opacity: 0;
      transform: translateY(-20px) translateX(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(-20px) translateX(20px);
    }
  }
`;
const Line1 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Line2 = styled.div<{ $anim_delay: number }>`
  display: flex;
  flex-direction: row;
  animation: moveRight 3s ${(props) => props.$anim_delay - 2}s forwards;
  @keyframes moveRight {
    0% {
      margin-left: 0px;
      transform: translateX(0px);
    }
    100% {
      transform: translateX(240px);
    }
  }
`;

const UpperChar = styled.span<{ top: number; left: number; $anim_delay: number }>`
  animation: ${(props) => delayPosition(props.top, props.left)} 3s
    ${(props) => props.$anim_delay + 0.5}s forwards;
`;

const delayPosition = (top: number, left: number) => keyframes`
  from {
    transform: translate(0px, 0px);
  }
  to {
    transform: translateY(${top}px) translateX(${left}px);
  }
`;

export default AnimatedText;
