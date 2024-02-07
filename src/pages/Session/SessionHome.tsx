import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SessionContent from '@pages/Session/SessionContent';
import SessionModal from '@pages/Session/SessionModal/SessionModal';
import { ReactComponent as AddIcon } from '@assets/add_icon.svg';
import { ReactComponent as SettingIcon } from '@assets/setting_icon.svg';
import GenerationSelect from '@components/GenerationSelect';
import { IGeneration, ISession } from '@/typing/db';
import api from '@/api/api';

const SessionHome = () => {
  const [sessions, setSessions] = useState<undefined | ISession[]>();
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [modifySession, setModifySession] = useState<undefined | ISession>();
  const [lastWeek, setLastWeek] = useState(0);
  const [selectedGeneration, setSelectedGeneration] = useState<IGeneration | undefined>();

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      setLastWeek(sessions[sessions.length - 1].number);
    } else {
      setLastWeek(-1);
    }
  }, []);

  const onChangeGeneration = useCallback(
    (generation: IGeneration | undefined) => {
      setSelectedGeneration(generation);

      if (generation) {
        api
          .get(`/v1/api/session?generationId=${generation?.generationId}`)
          .then((res) => setSessions(res.data))
          .catch((err) => console.error(err));
      }
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
          {!sessions ? (
            <SessionReady>
              <SettingIcon />
              <p>세션 준비중입니다.</p>
            </SessionReady>
          ) : (
            sessions?.map((session) => (
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
        generationId={selectedGeneration?.generationId}
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
