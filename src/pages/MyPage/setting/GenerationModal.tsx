import React, { ChangeEvent, useCallback, useState } from 'react';
import ReactModal, { Styles } from 'react-modal';
import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg';
import TextBox from '@components/TextBox';
import { ReactComponent as CalendarIcon } from '@assets/calendar_icon.svg';
import GenerationDayPicker from '@pages/MyPage/setting/GenerationDayPicker';
import dayjs from 'dayjs';
import api from '@/api/api';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenerationModal = ({ modalOpen, setModalOpen }: Props) => {
  const [generation, setGeneration] = useState('');
  const [dates, setDates] = useState<Date[] | undefined>([]);
  const [sessionCount, setSessionCount] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleAfterOpen = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handelAfterClose = useCallback(() => {
    setGeneration('');
    setDates([]);
    setSessionCount('');
    document.body.style.overflow = 'unset';
  }, []);

  const onChageGeneration = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setGeneration(e.target.value);
    },
    [generation],
  );

  const onChageSessionCount = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setSessionCount(e.target.value);
    },
    [sessionCount],
  );

  const getDateStr = useCallback(() => {
    if (dates && dates.length > 0) {
      dates.sort((left, right) => left.getTime() - right.getTime());

      const startStr = dayjs(dates[0]).format('YYYY년 MM월 DD일');
      if (dates.length >= 2) {
        const endStr = dayjs(dates[1]).format('YYYY년 MM월 DD일');
        return `${startStr} ~ ${endStr}`;
      }

      return `${startStr}`;
    }
    return '';
  }, [dates]);

  const onClickUploadButton = useCallback(() => {
    api
      .post('v1/api/generation/add', {
        generationNumber: parseInt(generation),
        sessionCount: sessionCount,
        startDate: dates?.at(0),
        endDate: dates?.at(1),
      })
      .then(() => setModalOpen(false))
      .catch((err) => console.error(err));
  }, [generation, sessionCount, dates]);

  return (
    <ReactModal
      isOpen={modalOpen}
      style={modalStyle}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handelAfterClose}
    >
      <ModalWrapper>
        <ModalCloseButton>
          <CloseIcon width="36" height="36" fill="#BBBBBB" onClick={() => setModalOpen(false)} />
        </ModalCloseButton>
        <ModalHeader>
          <h3>기수 추가</h3>
        </ModalHeader>
        <BoxContainer>
          <TextBox
            value={generation}
            placeholder="추가할 기수를 입력하세요."
            onChange={onChageGeneration}
            height="60px"
          />
          <PeriodWrapper>
            <TextBox
              value={getDateStr()}
              placeholder="기수의 기간을 설정하세요."
              height="60px"
              readOnly={true}
            />
            <CalendarButton onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
              <CalendarIcon />
            </CalendarButton>
          </PeriodWrapper>
          <TextBox
            value={sessionCount}
            placeholder="총 세션 갯수를 입력하세요."
            onChange={onChageSessionCount}
            height="60px"
          />
        </BoxContainer>
        <ButtonContainer>
          <UploadButton onClick={onClickUploadButton}>
            <p>추가하기</p>
          </UploadButton>
        </ButtonContainer>
        <GenerationDayPicker
          isOpen={isCalendarOpen}
          setIsOpen={setIsCalendarOpen}
          dates={dates}
          setDates={setDates}
        />
      </ModalWrapper>
    </ReactModal>
  );
};

export default GenerationModal;

const modalStyle: Styles = {
  overlay: {},
  content: {
    width: '700px',
    height: '472px',
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
  align-items: center;
  width: 100%;
`;

const ModalCloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  margin: 24px 0 16px;

  > h3 {
    color: #000;
    font-family: NanumSquareRound;
    font-weight: 700;
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
  gap: 8px;
`;

const PeriodWrapper = styled.div`
  position: relative;
`;

const CalendarButton = styled.button`
  position: absolute;
  top: 6px;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background: #1e1e1e;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 40px;
  margin-left: 8px;
  border-radius: 5px;

  > p {
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 700;
  }
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
`;

const UploadButton = styled(Button)`
  background: #477feb;
  border: none;
`;
