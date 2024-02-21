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
  const [mobile, setMobile] = useState(window.innerWidth < 768 ? true : false);
  const [spaces, setSpaces] = useState<number[]>([]);

  const checkUpper = (char: string) => {
    return char === char.toUpperCase() && char.match(/[a-zA-Z]/);
  };

  const animDelay = 3; // 최소 2
  const line1Ref = React.useRef<HTMLDivElement>(null);
  const line2Ref = React.useRef<HTMLDivElement>(null);
  const charORef = React.useRef<HTMLSpanElement>(null);
  let topValue = 0;
  let leftValue = 0;
  let widthValue = 0;

  if (line1Ref.current && line2Ref.current) {
    topValue = (line1Ref as any).current?.offsetTop - (line2Ref as any).current?.offsetTop;
  }
  if (charORef.current) {
    leftValue = charORef.current.offsetLeft;
    widthValue = charORef.current.offsetWidth;
  }

  let correctionValue = [0, 0, 0];

  useEffect(() => {
    if (charORef.current) {
      // 높은 해상도에 대한 보정치 처리, 추후 보강 필요
      if (window.innerWidth > 1600) {
        correctionValue = [12, 9, 9];
        // 값이 커질수록 텍스트가 오른쪽으로 이동
      }
      setSpaces([
        0,
        0,
        -leftValue - widthValue * 1.3,
        -leftValue - widthValue * 1.3 - correctionValue[0],
        -leftValue - widthValue - 205 - correctionValue[1],
        -leftValue - widthValue - 205 - correctionValue[2],
      ]);
    }
  }, [charORef.current]);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  });

  return (
    <Box $anim_delay={animDelay}>
      <h5 className="subtitle">IT 연합동아리 코테이토</h5>
      <Line1 ref={line1Ref}>
        {line1.map((char, idx) =>
          checkUpper(char) ? (
            <UpperChar
              key={idx}
              $anim_delay={animDelay}
              top={0}
              left={char === 'C' ? spaces[0] : char === 'O' ? spaces[1] : spaces[2]}
              ref={idx === 1 ? charORef : null}
            >
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
      <Line2 $anim_delay={animDelay} ref={line2Ref}>
        {line2.map((char, idx) =>
          checkUpper(char) ? (
            <UpperChar
              key={idx}
              $anim_delay={animDelay}
              top={topValue}
              left={char === 'A' ? spaces[3] : char === 'T' ? spaces[4] : spaces[5]}
            >
              {char}
            </UpperChar>
          ) : (
            <span key={idx} className={checkUpper(char) ? '' : 'animated-char'}>
              {char === ' ' ? <>&nbsp;</> : char}
            </span>
          ),
        )}
      </Line2>

      {mobile && <MobileTitle>COTATO</MobileTitle>}

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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 500px;
  margin-top: 130px;
  cursor: default;
  .subtitle {
    font-size: 16px;
    color: #fff;
    text-align: start;
    margin: 0 0 200px 6px;
    opacity: 0;
    animation: fadeIn 2s ${(props) => props.$anim_delay + 1}s forwards;
  }
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
      /* display: none; */
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .typing-text {
    width: 18.5ch;
    animation:
      fadeInAndGoUp 4s ${(props) => props.$anim_delay}s forwards,
      typing 2s ${(props) => props.$anim_delay}s steps(24),
      blink 0.5s ${(props) => props.$anim_delay}s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    font-size: 1.8em;
    opacity: 0;
  }
  @keyframes fadeInAndGoUp {
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
    border-radius: 25px;
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
      background: linear-gradient(180deg, #6e6cfe 0%, rgba(189, 219, 255, 0.69) 100%);

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
  @media screen and (max-width: 768px) {
    margin-top: 120px;
    .subtitle {
      font-size: 14px;
      animation: fadeIn 0s 0s forwards;
      opacity: 1;
    }
    .typing-text {
      font-size: 1.5em;
      animation:
        fadeInAndGoUp 0s 0s forwards,
        typing 0s 0s steps(24),
        blink 0.5s 0s step-end infinite alternate;
    }
    .join-button {
      p {
        font-size: 20px;
      }
      animation: leftToRight 0s 0s forwards;
    }
    .animated-char {
      animation: fadeOut 0s 0s ease-in forwards;
    }
  }
`;
const Line1 = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  position: absolute;
  top: 285px;
`;

const Line2 = styled.div<{ $anim_delay: number }>`
  display: flex;
  flex-direction: row;
  height: 100px;
  position: absolute;
  top: 385px;
  animation: moveRight 3s ${(props) => props.$anim_delay - 2}s forwards;
  @keyframes moveRight {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(240px);
    }
  }
  @media screen and (max-width: 768px) {
    opacity: 0;
    animation: moveRight 0s 0s forwards;
  }
`;

const MobileTitle = styled.h2`
  position: absolute;
  font-size: 50px;
  top: 300px;
  margin: 0;
  font-family: Pretendard;
`;
const UpperChar = styled.span<{ top: number; left: number; $anim_delay: number }>`
  animation: ${(props) => delayPosition(props.top, props.left)} 3s
    ${(props) => props.$anim_delay + 0.5}s forwards;
  @media screen and (max-width: 768px) {
    opacity: 0;
    /* animation: ${(props) => delayPosition(props.top, props.left)} 0s 0s forwards; */
  }
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
