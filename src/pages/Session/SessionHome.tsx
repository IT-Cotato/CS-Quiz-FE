import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SessionContent from '@pages/Session/SessionContent';
import SessionModal from '@pages/Session/SessionModal/SessionModal';
import { ReactComponent as AddIcon } from '@assets/add_icon.svg';
import { ReactComponent as SettingIcon } from '@assets/setting_icon.svg';
import GenerationSelect from '@components/GenerationSelect';

// 임시 세션 타입
export interface ISession {
  id: number;
  image: File | null;
  description: string;
  week: number;
}
const sessions: ISession[] = [
  { id: 1, week: 0, image: null, description: '코테이토 8기 첫 만남 OT를 진행하였습니다' },
  { id: 2, week: 1, image: null, description: '1주차 세션을 진행하였습니다.' },
  { id: 3, week: 2, image: null, description: '2주차 세션을 진행하였습니다.' },
  { id: 4, week: 3, image: null, description: '3주차 세션을 진행하였습니다.' },
];
// const sessions: ISession[] = [];

const SessionHome = () => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [modifySession, setModifySession] = useState<undefined | ISession>();
  const [lastWeek, setLastWeek] = useState(0);
  const [selectedGeneration, setSelectedGeneration] = useState(0);

  useEffect(() => {
    setSelectedGeneration(8);
    if (sessions.length > 0) {
      setLastWeek(sessions[sessions.length - 1].week);
    } else {
      setLastWeek(-1);
    }
  }, []);

  const onChangeGeneration = useCallback(
    (generation: number) => {
      setSelectedGeneration(generation);
      // 그리고 여기서 api 요청을 보낼듯
    },
    [selectedGeneration],
  );

  const onClickAddButton = useCallback(() => {
    setModifySession(undefined);
    setIsSessionModalOpen(true);
  }, []);

  const handleModifyButton = useCallback((session: ISession) => {
    setModifySession(session);
    setIsSessionModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsSessionModalOpen(false);
  }, []);

  return (
    <>
      <SessionWrapper>
        <SessionHeader>세션 기록</SessionHeader>
        <SessionSetting>
          <GenerationSelect
            onChangeGeneration={onChangeGeneration}
            selectedGeneration={selectedGeneration}
          />
          {/* 권한에 따라 add는 선택적으로 보여지게 */}
          <ButtonWrapper>
            <AddIcon onClick={onClickAddButton} />
          </ButtonWrapper>
        </SessionSetting>
        <SessionContentsContainer>
          {sessions.length === 0 ? (
            <SessionReady>
              <SettingIcon />
              <p>세션 준비중입니다.</p>
            </SessionReady>
          ) : (
            sessions.map((session) => (
              <SessionContent
                key={session.id}
                session={session}
                handleModifyButton={handleModifyButton}
              />
            ))
          )}
        </SessionContentsContainer>
      </SessionWrapper>
      <SessionModal
        isOpen={isSessionModalOpen}
        onCloseModal={onCloseModal}
        session={modifySession}
        lastWeek={lastWeek}
      />
    </>
  );
};

export default SessionHome;

const SessionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const SessionHeader = styled.h1`
  margin: 144px 0 100px;

  color: #1d1d1d;
  font-family: NanumSquareRound;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const SessionSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  > svg {
    margin-left: 8px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
`;

const SessionContentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  align-content: start;
  width: 70%;
  margin: 28px 0 120px;

  @media only screen and (max-width: 957px) {
    justify-content: center;
  }
`;

const SessionReady = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 160px;

  p {
    color: #9a9a9a;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
