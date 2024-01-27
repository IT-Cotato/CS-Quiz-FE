import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';

interface Props {
  activity: string;
}

const SessionEmoji = ({ activity }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const getEmojiColor = useCallback(() => {
    if (activity === 'CS') {
      return '#D7E5CA';
    } else if (activity === 'IT') {
      return '#D2E0FB';
    } else if (activity === 'NW') {
      return '#F9F3CC';
    }
    return 'none';
  }, [activity]);

  const getEmojiDescription = useCallback(() => {
    if (activity === 'CS') {
      return 'CS 문제풀이';
    } else if (activity === 'IT') {
      return 'IT이슈';
    } else if (activity === 'NW') {
      return '네트워킹 데이';
    }
    return '';
  }, [activity]);

  return (
    <EmojiBox
      background={getEmojiColor()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <p>{activity}</p>
      {isHover && (
        <EmojiDescriptsion color={getEmojiColor()}>
          <p>{getEmojiDescription()}</p>
        </EmojiDescriptsion>
      )}
    </EmojiBox>
  );
};

export default SessionEmoji;

const EmojiBox = styled.div<{ background: string }>`
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin: 0 4px;
  border-radius: 5px;
  background: ${(props) => props.background};

  > p {
    color: #000;
    font-family: NanumSquareRound;
    font-size: 12px;
    font-weight: 400;
  }
`;

const EmojiDescriptsion = styled.div<{ color: string }>`
  z-index: 1;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  width: max-content;
  align-items: center;
  border-radius: 5px;
  background: rgba(59, 59, 59, 0.92);

  > p {
    color: ${(props) => props.color};
    font-family: NanumSquareRound;
    font-size: 12px;
    font-weight: 400;
    margin: 8px 16px;
  }

  ::after {
    content: '';
    position: absolute;
    left: calc(50% - 6px);
    top: 29.5px;
    width: 0;
    height: 0;
    border-top: 12px solid rgba(59, 59, 59, 0.92);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;
