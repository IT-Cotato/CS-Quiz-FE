import React from 'react';
import { ICSEdu } from '@pages/CS/CSHome';
import { styled, css } from 'styled-components';

/*
논의 사항

콘텐츠 사이즈는 우선 세션꺼랑 똑같이 잡아둠
근데 얘는 좀 줄일 필요가 있나??
*/

interface Props {
  cs: ICSEdu;
}

const CSContent = ({ cs }: Props) => {
  return (
    <Content>
      <ContentWeek>{`${cs.week}주차 문제`}</ContentWeek>
      <ContentTitle>{cs.title}</ContentTitle>
    </Content>
  );
};

export default CSContent;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 356px;
  height: 292px;
  border-radius: 10px;
  background: #e4ecfd;
  margin: 20px 4px;
`;

const fontStyle = css`
  // font-size, font-weight 정의 안함
  color: #1f1f1f;
  font-family: NanumSquareRound;
  font-style: normal;
  line-height: normal;
`;

const ContentWeek = styled.p`
  position: absolute;
  top: 0px;
  left: 28px;
  ${fontStyle}
  font-size: 24px;
  font-weight: 700;
`;

const ContentTitle = styled.p`
  ${fontStyle}
  font-size: 36px;
  font-weight: 600;
`;
