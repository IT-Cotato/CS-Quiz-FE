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
}

const CSModal = ({ isOpen, onCloseModal, educatoin }: Props) => {
  const [week, setWeek] = useState('');
  const [educationNum, setEducationNum] = useState(0);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (educatoin) {
      setWeek(`${educatoin.educationNumber}주차 교육`);
      setEducationNum(educatoin.educationNumber);
      setSubject(educatoin.subject);
    }
  }, [educatoin]);

  const cleanInputState = useCallback(() => {
    setWeek('');
    setEducationNum(0);
    setSubject('');
  }, []);

  // 로직을 쫌더 엄격하게 가야할듯
  const onChangeWeek = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const num = parseInt(e.target.value);

      if (num && num !== educationNum) {
        setEducationNum(num);
        setWeek(`${num}주차 교육`);
      } else {
        setWeek(e.target.value);
      }
    },
    [week],
  );

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
    [educatoin, week, educationNum, subject],
  );

  return (
    <ReactModal isOpen={isOpen} onAfterClose={cleanInputState} style={modalStyle}>
      <ModalWrapper>
        <ModalCloseButton>
          <CloseIcon width="57" height="56" fill="#686868" onClick={onCloseModal} />
        </ModalCloseButton>
        <Header>
          <h3>{!educatoin ? '교육 추가' : '교육 수정'}</h3>
        </Header>
        <BoxContainer>
          <SessionSelect />
          <TextBox
            value={week}
            placeholder="교육 주차를 입력하세요"
            onChange={onChangeWeek}
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
    marginTop: '10%',
    top: '50%',
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
