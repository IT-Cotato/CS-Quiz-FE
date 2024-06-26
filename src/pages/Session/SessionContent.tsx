import React, { useCallback, useState } from 'react';
import { ISession } from '@/typing/db';
import styled from 'styled-components';
import SessionEmoji from '@pages/Session/SessionEmoji';
import { ReactComponent as ModifyIcon } from '@assets/modify_icon.svg';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import cotato_icon from '@assets/cotato_icon.png';

interface Props {
  session: ISession;
  handleModifyButton: (session: ISession) => void;
  sessionCount?: number;
}

const SessionContent = ({ session, handleModifyButton, sessionCount }: Props) => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);

  const [isHover, setIsHover] = useState(false);

  const onMouseEnterImage = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeaveImage = useCallback(() => {
    setIsHover(false);
  }, []);

  const getSessionWeekStr = useCallback(() => {
    if (session.sessionNumber === 0) {
      return 'OT';
    } else if (sessionCount && session.sessionNumber === sessionCount - 1) {
      return '데모데이';
    }
    return `${session.sessionNumber}주차 세션`;
  }, [session, sessionCount]);

  return (
    <Content>
      <SessionImage
        onMouseEnter={onMouseEnterImage}
        onMouseLeave={onMouseLeaveImage}
        photourl={session.photoUrl}
      />
      {isHover ? (
        <HoverContent onMouseEnter={onMouseEnterImage} onMouseLeave={onMouseLeaveImage}>
          <p>{getSessionWeekStr()}</p>
          <p>{session.description}</p>
          {user?.role === 'ADMIN' && <ModifyIcon onClick={() => handleModifyButton(session)} />}
        </HoverContent>
      ) : (
        <Title>
          <p>{session.sessionNumber === 0 ? 'OT' : `${session.sessionNumber}주차 세션`}</p>
          <EmojiWrapper>
            {session.csEducation === 'CS_ON' && <SessionEmoji activity="CS" />}
            {session.itIssue === 'IT_ON' && <SessionEmoji activity="IT" />}
            {session.networking === 'NW_ON' && <SessionEmoji activity="NW" />}
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
  width: 260px;
  height: 280px;
  margin: 24px 4px;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 240px;
    height: 260px;
  }
`;

interface SessionImageProps {
  photourl: string;
}
const SessionImage = styled.div<SessionImageProps>`
  z-index: 0;
  background-image: url(${(props) => (props.photourl ? props.photourl : cotato_icon)});
  background-size: 100% 280px;
  width: 100%;
  height: 280px;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    background-size: 100% 260px;
  }
`;

const Title = styled.div`
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #f3f7ff;
  border-radius: 10px;
  margin-top: -8px;
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
  border-radius: 10px;
  background-color: #000;
  opacity: 0.8;
  padding: 20px 24px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    height: 260px;
  }

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
    fill: #f3f7ff;
  }
`;
