import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg';
import TextBox from '@components/TextBox';
import { IEducation } from '@/typing/db';
import SessionSelect from '@components/SessionSelect';

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  educatoin?: IEducation;
  generationId?: number;
  fetchEducations: (generationId?: number) => void;
}

const CSModal = ({ isOpen, onCloseModal, educatoin, generationId, fetchEducations }: Props) => {
  const [sessionNumber, setSessionNumber] = useState(-1);
  const [educationNum, setEducationNum] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (educatoin) {
      setSessionNumber(educatoin.sessionNumber);
      setEducationNum(`${educatoin.educationNumber}주차 교육`);
      setSubject(educatoin.subject);
    }
  }, [educatoin]);

  const handleAfterOpen = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handleAfterClose = useCallback(() => {
    setEducationNum('');
    setSubject('');
    document.body.style.overflow = 'unset';
  }, []);

  const onChangeEducationNum = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEducationNum(e.target.value);
  }, []);

  const onChangeSubject = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(e.target.value);
  }, []);

  const onClickDeleteButton = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('delete');
    // 삭제 이후 모달을 끄는 동작 필요
  }, []);

  const onClickAddButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!educatoin) {
        // 업로드 요청
        console.log('upload');
      } else {
        // 수정 요청
        console.log('modify');
      }

      // 제출 이후 모달을 끄는 동작 필요
    },
    [educatoin, educationNum, subject],
  );

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
      style={modalStyle}
    >
      <ModalWrapper>
        <ModalCloseButton>
          <CloseIcon width="57" height="56" fill="#686868" onClick={onCloseModal} />
        </ModalCloseButton>
        <Header>
          <h3>{!educatoin ? '교육 추가' : '교육 수정'}</h3>
        </Header>
        <BoxContainer>
          <SessionSelect education={educatoin} generationId={generationId} />
          <TextBox
            value={educationNum}
            placeholder="교육 주차를 입력하세요"
            onChange={onChangeEducationNum}
            height="60px"
          />
          <TextBox
            value={subject}
            placeholder="주제를 입력하세요."
            onChange={onChangeSubject}
            height="60px"
          />
        </BoxContainer>
        <ButtonContainer>
          {educatoin && (
            <DeleteButton type="button" onClick={onClickDeleteButton}>
              교육 삭제
            </DeleteButton>
          )}
          <UploadButton type="button" onClick={onClickAddButton}>
            업로드
          </UploadButton>
        </ButtonContainer>
      </ModalWrapper>
    </ReactModal>
  );
};

export default CSModal;

const modalStyle = {
  overlay: {
    overflow: 'auto',
  },
  content: {
    width: '740px',
    height: '480px',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    justifyContent: 'center',
  },
};

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModalCloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  cursor: pointer;
`;

const fontStyle = css`
  font-family: NanumSquareRound;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;

  > h3 {
    ${fontStyle};
    color: #000;
    font-size: 24px;
    margin-top: 0;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
  gap: 8px;
`;

const Button = styled.button`
  width: 96px;
  height: 40px;
  margin-left: 8px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 500px;
  margin: 32px auto;
`;

const DeleteButton = styled(Button)`
  background: #eb5353;
  border: none;
  ${fontStyle};
  color: #fff;
`;

const UploadButton = styled(Button)`
  background: #477feb;
  border: none;
  ${fontStyle};
  color: #fff;
`;
