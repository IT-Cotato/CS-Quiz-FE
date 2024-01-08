import React, { useCallback } from 'react';
import { ICSEdu } from '@pages/CS/CSHome';
import { styled, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Props {
  cs: ICSEdu;
  generation: number;
}

const CSContent = ({ cs, generation }: Props) => {
  const navigate = useNavigate();

  const onclickContent = useCallback(() => {
    navigate(`/cs/start/?generation=${generation}&week=${cs.week}`);
  }, [generation, cs.week]);

  return (
    <Content onClick={onclickContent}>
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
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background: #e4ecfd;
  margin: 20px 4px;
  cursor: pointer;
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
