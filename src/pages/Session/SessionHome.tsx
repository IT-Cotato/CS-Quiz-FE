import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import SessionContent from '@pages/Session/SessionContent';
import SeasonsSelect from '@components/SeasonsSelect';
import add_icon from '@assets/add_icon.svg';
import SessionModal from '@pages/Session/SessionModal';

/*
해야 할 것

헤더랑 세팅 마진 비율 계산해서 반영
세션 추가 모달
*/

/*
예기를 해 볼것

세션 페이지에서 세션 콘텐츠가 생기면 위에 세팅이랑 몇 비율로 떨어저야 할지
react select 쓸지 고민 -> 쓰면 검색이 가능 ? 드롭 다운에 대해 통일이 필요
기수선택 배경 흰색이라 잘 안보여시 이렇게 갈지 논의
옆에 인스타랑 메일 버튼은 무엇?
세션 수정이랑 삭제에 대해서는 어떻게 흘러가는지. 이것도 모달로? 세션 클릭으로?


*/

// 임시 세션 타입 (id만 가지는)
export interface ISession {
  id: number;
}
const sessiontData: ISession[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const SessionHome = () => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [sessionModalMode, setSessionModalMode] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSeasonChange = useCallback(() => {}, []);
  const onClickAddButton = useCallback(() => {
    setIsSessionModalOpen(true);
    setSessionModalMode('add');
  }, []);

  return (
    <>
      <SessiontWrapper>
        <SessionHeader>
          <h1>세션 기록</h1>
        </SessionHeader>
        <SessionSetting>
          <SeasonsSelect />
          {/* 권한에 따라 add는 선택적으로 보여지게 */}
          <img src={add_icon} alt="add-icon" onClick={onClickAddButton} />
        </SessionSetting>
        <SessionContentsContainer>
          {sessiontData.map((session) => (
            <SessionContent key={session.id} session={session} />
          ))}
        </SessionContentsContainer>
      </SessiontWrapper>
      <SessionModal isOpen={isSessionModalOpen} mode={sessionModalMode} />
    </>
  );
};

/*
margin-left : 11.88
margin-right: 11.75
full page rem : 90
*/

export default SessionHome;

// 구지 헤더 태그 안만드는 방법 생각 필요
const SessionHeader = styled.div`
  height: 15rem;
  display: flex;
  align-items: center;

  h1 {
    color: #1d1d1d;
    font-family: NanumSquareRound;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
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
  width: 85%;

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
  width: 85%;
  height: 1000px;

  margin-top: 1rem;
  /* background-color: pink; */
`;
