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
      <img src={initial_session} alt="initial_session" />
      <div>{session.id}</div>
    </Content>
  );
};

export default SessionContent;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: 20rem;

  // id number
  font-size: 100px;

  img {
    width: 100%;
    height: 14rem;
    border-radius: 0.625rem;
  }

  div {
    width: 100%;
    height: 6rem;
    background: #efeff0;
  }
`;
