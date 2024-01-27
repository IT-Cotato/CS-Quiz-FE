import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { css, styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg';
import ToggleButton from '@components/ToggleButton';
import ImageBox from '@pages/Session/SessionModal/ImageBox';
import TextBox from '@pages/Session/SessionModal/TextBox';
import PopUp from '@pages/Session/SessionModal/PopUp';
import { ISession } from '../SessionHome';

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  session?: ISession;
  lastWeek: number;
}

const SessionModal = ({ isOpen, onCloseModal, session, lastWeek }: Props) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [itNews, setItNews] = useState(true);
  const [csEdu, setCsEdu] = useState(true);
  const [networking, setNetworking] = useState(false);
  const [description, setDescription] = useState('');

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const getTitle = useCallback((week: number) => {
    if (week === 0) {
      return 'OT';
    }
    return `${week}주차 세션`;
  }, []);

  useEffect(() => {
    if (session) {
      setTitle(getTitle(session.week));
      setDescription(session.description);
    } else {
      setTitle(getTitle(lastWeek + 1));
    }
  }, [session]);

  const cleanInputState = useCallback(() => {
    setTitle('');
    setImage(null);
    setItNews(true);
    setCsEdu(true);
    setNetworking(false);
    setDescription('');
  }, []);

  const onChangeItNews = useCallback(() => {
    setItNews(!itNews);
  }, [itNews]);

  const onChangeCsEdu = useCallback(() => {
    setCsEdu(!csEdu);
  }, [csEdu]);

  const onChangeNetworking = useCallback(() => {
    setNetworking(!networking);
  }, [networking]);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const onClickDeleteButton = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('delete');
    // 삭제 이후 모달을 끄는 동작 필요
  }, []);

  const onClickAddButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!session) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const week = lastWeek + 1;

        // 업로드 요청
        console.log('upload');
      } else {
        // 수정 요청
        console.log('modify');
      }

      // 제출 이후 모달을 끄는 동작 필요
    },
    [session, itNews, csEdu, networking, description],
  );

  const closePopUp = useCallback(() => {
    setIsPopUpOpen(false);
  }, []);

  return (
    <ReactModal isOpen={isOpen} onAfterClose={cleanInputState} style={ModalStyle}>
      <ModalWrapper>
        <ModalCloseButton>
          <CloseIcon width="57" height="56" fill="#686868" onClick={onCloseModal} />
        </ModalCloseButton>
        <Header>
          <h3>{!session ? '세션 추가' : '세션 수정'}</h3>
        </Header>
        <BoxContainer>
          <ImageBox image={image} setImage={setImage} setIsPopUpOpen={setIsPopUpOpen} />
          <TextBox value={title} textType="title" />
          <ToggleButtonBox>
            <p>it 뉴스</p>
            <ToggleButton toggled={itNews} onClick={onChangeItNews} />
            <p>CS 교육</p>
            <ToggleButton toggled={csEdu} onClick={onChangeCsEdu} />
            <p>네트워킹</p>
            <ToggleButton toggled={networking} onClick={onChangeNetworking} />
          </ToggleButtonBox>
          <TextBox value={description} onChange={onChangeDescription} textType="description" />
        </BoxContainer>
        <ButtonContainer>
          {session && (
            <DeleteButton type="button" onClick={onClickDeleteButton}>
              세션 삭제
            </DeleteButton>
          )}
          <UploadButton type="button" onClick={onClickAddButton}>
            업로드
          </UploadButton>
        </ButtonContainer>
        {isPopUpOpen && <PopUp closePopUp={closePopUp} text="하나의 이미지만 드래그 해주세요." />}
      </ModalWrapper>
    </ReactModal>
  );
};

export default SessionModal;

const ModalStyle = {
  overlay: {
    overflow: 'auto',
  },
  content: {
    width: '740px',
    height: '800px',
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
  color: #a1a1a1a1;
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
    ${fontStyle}
    color: #000;
    font-size: 24px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
`;

const ToggleButtonBox = styled.div`
  display: flex;
  width: 500px;
  height: 60px;
  border-radius: 10px;
  background: #f1f1f1;
  margin-top: 8px;
  align-items: center;

  > p {
    ${fontStyle}
    color: #7b7b7b;
    padding: 5px 0;
    margin-left: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 500px;
  margin: 28px auto;
`;

const Button = styled.button`
  width: 96px;
  height: 40px;
  margin-left: 8px;
  border-radius: 5px;
`;

const DeleteButton = styled(Button)`
  background: #eb5353;
  border: 2px solid #c6c6c6;
  ${fontStyle}
  color: #fff;
`;

const UploadButton = styled(Button)`
  background: #477feb;
  border: none;
  ${fontStyle}
  color: #FFF;
`;
