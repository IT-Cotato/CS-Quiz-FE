import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CSContent from '@pages/CS/CSContent';
import { ReactComponent as SettingIcon } from '@assets/setting_icon.svg';
import { ReactComponent as AddIcon } from '@assets/add_icon.svg';
import GenerationSelect from '@components/GenerationSelect';
import CSModal from '@pages/CS/CSModal';

// 임시 CS 타입 (id만 가지는)
export interface IEducation {
  id: number;
  week: number;
  subject: string;
}

const educations: IEducation[] = [
  { id: 1, week: 1, subject: 'AWS' },
  { id: 2, week: 2, subject: '브라우저 렌더링' },
  { id: 3, week: 3, subject: 'IP 주소' },
  { id: 4, week: 4, subject: '파일시스템' },
];
// const educations: IEducation[] = [];

const CSHome = () => {
  const [isCSModalOpen, setIsCSModalOpen] = useState(false);
  const [modifyEducation, setModifyEducation] = useState<undefined | IEducation>();
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

  const onClickAddButton = useCallback(() => {
    setModifyEducation(undefined);
    setIsCSModalOpen(true);
  }, []);

  const handleModifyButton = useCallback((session: IEducation) => {
    setModifyEducation(session);
    setIsCSModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsCSModalOpen(false);
  }, []);

  return (
    <>
      <CSWrapper>
        <CSHeader>CS 문제풀이</CSHeader>
        <CSSetting>
          <GenerationSelect
            onChangeGeneration={onChangeGeneration}
            selectedGeneration={selectedGeneration}
          />
          {/* 권한에 따라 add는 선택적으로 보여지게 */}
          <ButtonWrapper>
            <AddIcon onClick={onClickAddButton} />
          </ButtonWrapper>
        </CSSetting>
        <CSContentsContainer>
          {educations.length === 0 ? (
            <CSReady>
              <SettingIcon />
              <p>CS 문제풀이 준비중입니다.</p>
            </CSReady>
          ) : (
            educations.map((education) => (
              <CSContent key={education.week} cs={education} generation={selectedGeneration} />
            ))
          )}
        </CSContentsContainer>
      </CSWrapper>
      <CSModal isOpen={isCSModalOpen} onCloseModal={onCloseModal} educatoin={modifyEducation} />
    </>
  );
};

export default CSHome;

const CSWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const CSHeader = styled.h1`
  margin: 144px 0 100px;

  color: #1d1d1d;
  font-family: NanumSquareRound;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const CSSetting = styled.div`
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
`;

const CSReady = styled.div`
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
