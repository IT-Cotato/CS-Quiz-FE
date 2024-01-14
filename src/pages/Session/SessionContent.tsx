import React, { useState } from 'react';
import { ISession } from './SessionHome';
import styled from 'styled-components';
import cotato_icon from '@assets/cotato_icon.png';

/*
 이모지 확정됨? 
 */

interface Props {
  session: ISession;
}

const SessionContent = ({ session }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Content onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className="session-img" />
      <div className="title">
        <p>{session.title}</p>
      </div>
      {isHover && (
        <HoverContent>
          <p>{session.title}</p>
          <p>{session.description}</p>
        </HoverContent>
      )}
    </Content>
  );
};

export default SessionContent;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 24px 4px;

  > .session-img {
    background-image: url(${cotato_icon});
    background-size: 100% 100%;
    height: 280px;
    border-radius: 10px;
  }

  > .title {
    display: flex;
    align-items: center;
    background: #f3f7ff;
    border-radius: 10px;
    height: 52px;

    > p {
      margin-left: 20px;
      color: #1f1f1f;
      font-family: NanumSquareRound;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;

const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: left;
  }
`;
