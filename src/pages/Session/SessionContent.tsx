import React, { useCallback, useState } from 'react';
import { ISession } from './SessionHome';
import styled from 'styled-components';
import cotato_icon from '@assets/cotato_icon.png';
import SessionEmoji from '@pages/Session/SessionEmoji';
import { ReactComponent as ModifyIcon } from '@assets/modify_icon.svg';

interface Props {
  session: ISession;
  handleModifyButton: (session: ISession) => void;
}

const SessionContent = ({ session, handleModifyButton }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const onMounseEnterImage = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeaveImage = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <Content>
      <SessionImage
        onMouseEnter={onMounseEnterImage}
        onMouseLeave={onMouseLeaveImage}
        ishover={isHover.toString()}
      />
      {isHover ? (
        <HoverContent onMouseEnter={onMounseEnterImage} onMouseLeave={onMouseLeaveImage}>
          <p>{session.title}</p>
          <p>{session.description}</p>
          {/* 운영진만 보이게 */}
          <ModifyIcon onClick={() => handleModifyButton(session)} />
        </HoverContent>
      ) : (
        <Title>
          <p>{session.title}</p>
          <EmojiWrapper>
            <SessionEmoji activity="CS" />
            <SessionEmoji activity="IT" />
            <SessionEmoji activity="NW" />
          </EmojiWrapper>
        </Title>
      )}
    </Content>
  );
};

export default SessionContent;

const Content = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 332px;
  margin: 24px 4px;
  border-radius: 10px;
`;

const SessionImage = styled.div<{ ishover: string }>`
  z-index: 0;
  background-image: url(${cotato_icon});
  background-image: url('https://velog.velcdn.com/images/whdnjsdud551/post/840b06f3-2781-4d0f-af92-27f1b3c802ee/image.jpeg');
  background-size: 100% 332px;
  width: 100%;
  height: ${(props) => (props.ishover === 'true' ? '332px' : '280px')};
  border-radius: 10px;
`;

const Title = styled.div`
  z-index: -1;
  position: absolute;
  top: 272px;
  left: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #f3f7ff;
  border-radius: 10px;
  padding-top: 8px;

  > p {
    margin-left: 20px;
    color: #1f1f1f;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 700;
  }
`;

const EmojiWrapper = styled.div`
  display: flex;
  margin-right: 8px;
`;

const HoverContent = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 280px;
  height: 332px;
  border-radius: 10px;
  background-color: #000;
  opacity: 0.8;
  padding: 20px 24px;
  box-sizing: border-box;

  > p {
    margin-top: 16px;
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
  }

  > svg {
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
  }
`;
