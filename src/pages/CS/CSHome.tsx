import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CSContent from '@pages/CS/CSContent';
import setting_icon from '@assets/setting_icon.svg';
import GenerationSelect from '@components/GenerationSelect';

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
  const [selectedGeneration, setSelectedGeneration] = useState(0);

  useEffect(() => {
    // 기수의 최대값
    setSelectedGeneration(8);
  }, []);

  const onChangeGeneration = useCallback(
    (generation: number) => {
      setSelectedGeneration(generation);
      // 그리고 여기서 api 요청을 보낼듯
    },
    [selectedGeneration],
  );

  return (
    <CSWrapper>
      <CSHeader>CS 문제풀이</CSHeader>
      <CSSetting>
        <GenerationSelect
          onChangeGeneration={onChangeGeneration}
          selectedGeneration={selectedGeneration}
        />
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
            .map((cs) => <CSContent key={cs.week} cs={cs} generation={selectedGeneration} />)
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
