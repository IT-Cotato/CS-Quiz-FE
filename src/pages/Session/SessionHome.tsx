import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SessionContent from '@pages/Session/SessionContent';
import SeasonsSelect from '@components/SeasonsSelect';
import add_icon from '@assets/add_icon.svg';
import SessionModal from '@pages/Session/SessionModal';
import setting_icon from '@assets/setting_icon.svg';
import modify_icon from '@assets/modify_icon.svg';

/*
논의 사항
수정 시나리오

페이지 마진이 CS랑 다른지
*/

// 임시 세션 타입
export interface ISession {
  id: number;
  title: string;
  image: File | null;
  description: string;
}
const sessionData: ISession[] = [
  { id: 1, title: 'OT', image: null, description: '코테이토 8기 첫 만남 OT를 진행하였습니다' },
  { id: 2, title: '1주차 세션', image: null, description: '1주차 세션을 진행하였습니다.' },
  { id: 3, title: '2주차 세션', image: null, description: '2주차 세션을 진행하였습니다.' },
  { id: 4, title: '3주차 세션', image: null, description: '3주차 세션을 진행하였습니다.' },
];
// const sessionData: ISession[] = [];

const SessionHome = () => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [sessionModalMode, setSessionModalMode] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
    // 기수의 최대값
    setSelectedSeason(8);
  }, []);

  const onChangeSeason = useCallback(
    (season: number) => {
      setSelectedSeason(season);
      // 그리고 여기서 api 요청을 보낼듯
    },
    [selectedSeason],
  );

  const onClickAddButton = useCallback(() => {
    setIsSessionModalOpen(true);
    setSessionModalMode('add');
  }, []);

  const onClickModifyButton = useCallback(() => {
    setIsSessionModalOpen(true);
    setSessionModalMode('modify');
  }, []);

  const onCloseModal = useCallback(() => {
    setIsSessionModalOpen(false);
  }, [isSessionModalOpen]);

  return (
    <>
      <SessiontWrapper>
        <SessionHeader>세션 기록</SessionHeader>
        <SessionSetting>
          <SeasonsSelect onChangeSeason={onChangeSeason} selectedSeason={selectedSeason} />
          {/* 권한에 따라 add는 선택적으로 보여지게 */}
          <ButtonWrapper>
            <img src={modify_icon} alt="modify-icon" onClick={onClickModifyButton} />
            <img src={add_icon} alt="add-icon" onClick={onClickAddButton} />
          </ButtonWrapper>
        </SessionSetting>
        <SessionContentsContainer>
          {sessionData.length === 0 ? (
            <SessionReady className="session-ready">
              <img src={setting_icon} alt="setting-icon" />
              <p>세션 준비중입니다.</p>
            </SessionReady>
          ) : (
            sessionData.map((session) => <SessionContent key={session.id} session={session} />)
          )}
        </SessionContentsContainer>
      </SessiontWrapper>
      <SessionModal
        isOpen={isSessionModalOpen}
        onCloseModal={onCloseModal}
        mode={sessionModalMode}
      />
    </>
  );
};

export default SessionHome;

const SessionHeader = styled.h1`
  margin: 144px 0 100px;

  color: #1d1d1d;
  font-family: NanumSquareRound;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const SessiontWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SessionSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  > img {
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
  height: 1000px;
  margin-top: 28px;

  @media only screen and (max-width: 957px) {
    justify-content: center;
  }

  .session-ready {
    margin: auto;
    margin-top: 200px;
  }
`;

const SessionReady = styled.div`
  p {
    color: #9a9a9a;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
