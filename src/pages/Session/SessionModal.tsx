import React from 'react';
import ReactModal from 'react-modal';
import { styled } from 'styled-components';

/*
inline style 흠...
*/

interface Props {
  isOpen: boolean;
  mode: string;
}

const SessionModal = ({ isOpen, mode }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          justifyItems: 'center',
        },
        content: {
          width: '743px',
          height: '871px',
          borderRadius: '15px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {mode}
    </ReactModal>
  );
};

export default SessionModal;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Modal = styled(ReactModal)`
  /* background-color: red; */
`;
