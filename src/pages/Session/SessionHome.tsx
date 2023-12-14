import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import SessionContent from '@pages/Session/SessionContent';
import SeasonsSelect from '@components/SeasonsSelect';
import add_icon from '@assets/add_icon.svg';
import SessionModal from '@pages/Session/SessionModal';
import setting_icon from '@assets/setting_icon.svg';

/*
해야 할 것

헤더랑 세팅 마진 비율 계산해서 반영
세션 추가 모달
*/

/*
회의 후 수정 사항

기수를 Home 컴포넌트에서 관리해야, Modal 에서 세션 기록 설정할때 기수 넘겨주기 가능
박스는 살려두고 블러 처리에서 표현 -> 박스에는 제목이랑 아이콘, 블러된 화면에는 세부 설명
*/

/*
논의 사항

운영진은 세션 수정을 어떻게 할지
클릭으로 한다면, hover 상태에서는 블러처리 후 상세 정보가 보여지고, 운영진은 클릭이 가능해서 수정 모달로 넘어가는지

세션 콘텐츠 전체적인 레이아웃 비율 조정이 필요
SessionContentContainer width를 줄이고, 그러면 SessionContent의 크기도 같이 줄여아 할듯
*/

// 임시 세션 타입 (id만 가지는)
export interface ISession {
  id: number;
}
const sessionData: ISession[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
// const sessionData: ISession[] = [];

const SessionHome = () => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [sessionModalMode, setSessionModalMode] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(0);

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
          <img src={add_icon} alt="add-icon" onClick={onClickAddButton} />
        </SessionSetting>
        <SessionContentsContainer>
          {sessionData.length === 0 ? (
            <SessionReady className="session-ready">
              <img src={setting_icon} alt={setting_icon} />
              <p>세션 준비중입니다.</p>
            </SessionReady>
          ) : (
            [...sessionData]
              .reverse()
              .map((session) => <SessionContent key={session.id} session={session} />)
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
  width: 76%;
  margin-bottom: 12px;

  img {
    width: 32.087px;
    height: 32.082px;
    cursor: pointer;
  }
`;

const SessionContentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  align-content: start;
  width: 76%;
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
