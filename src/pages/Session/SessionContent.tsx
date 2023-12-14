import React from 'react';
import { ISession } from './SessionHome';
import styled from 'styled-components';
import initial_session from '@assets/initial_session.svg';

interface Props {
  session: ISession;
}

const SessionContent = ({ session }: Props) => {
  return (
    <Content>
      <div className="session-img" />
      <div className="description">{session.id}</div>
    </Content>
  );
};

export default SessionContent;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 356px;
  height: 292px;
  margin: 20px 4px;

  // id number size
  font-size: 80px;

  > .session-img {
    background-image: url(${initial_session});
    background-size: 100%;
    height: 200px;
    border-radius: 10px;
  }

  > .description {
    background: #efeff0;
    border-radius: 10px;
    height: calc(100% - 200px);
  }
`;
