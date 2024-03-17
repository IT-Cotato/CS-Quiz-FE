import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import styled from 'styled-components';
import loadingGif from '@/assets/loading.svg';

export const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <Loading>
      <LoadingGif />
    </Loading>
  ) : null;
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const LoadingGif = styled.img.attrs({
  src: loadingGif,
  alt: 'loading',
})`
  width: 150px;
  height: 150px;
`;
