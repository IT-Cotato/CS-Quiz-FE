import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CSContent from '@pages/CS/CSContent';
import SeasonsSelect from '@components/SeasonsSelect';
import setting_icon from '@assets/setting_icon.svg';

/*
논의 사항

CS도 모달로 추가와 삭제를 가지나??
우선 추가하는건 빼놓은 상태
세션 추가할때 CS를 선택하는데, 이게 거기서 같이 연동이 되어서 자동적으로 오는지 erd를 봐야 알듯

데이터가 없을때 띄어질 문구
*/

/*
cs 추가할때 세션이랑 연결
*/
// 임시 CS 타입 (id만 가지는)
export interface ICSEdu {
  week: number;
  title: string;
}

const CSData: ICSEdu[] = [
  { week: 1, title: 'AWS' },
  { week: 2, title: '브라우저 렌더링' },
  { week: 3, title: 'IP 주소' },
  { week: 4, title: '파일시스템' },
];
// const CSData: ICSEdu[] = [];

const CSHome = () => {
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

  return (
    <CSWrapper>
      <CSHeader>CS 문제풀이</CSHeader>
      <CSSetting>
        <SeasonsSelect onChangeSeason={onChangeSeason} selectedSeason={selectedSeason} />
      </CSSetting>
      <CSContentsContainer>
        {CSData.length === 0 ? (
          <CSReady className="cs-ready">
            <img src={setting_icon} alt="cs-icon" />
            <p>CS 문제풀이 준비중입니다.</p>
          </CSReady>
        ) : (
          [...CSData]
            .reverse()
            .map((cs) => <CSContent key={cs.week} cs={cs} generation={selectedSeason} />)
        )}
      </CSContentsContainer>
    </CSWrapper>
  );
};

export default CSHome;

const CSHeader = styled.h1`
  margin: 144px 0 100px;

  color: #1d1d1d;
  font-family: NanumSquareRound;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const CSWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CSSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 12px;

  img {
    width: 32.087px;
    height: 32.082px;
    cursor: pointer;
  }
`;

const CSContentsContainer = styled.div`
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

  .cs-ready {
    margin: auto;
    margin-top: 200px;
  }
`;

const CSReady = styled.div`
  p {
    color: #9a9a9a;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
