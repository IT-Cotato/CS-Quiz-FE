import React, { useCallback, useState } from 'react';
import { IEducation } from '@pages/CS/CSHome';
import { styled, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ModifyIcon } from '@assets/modify_icon.svg';

interface Props {
  education: IEducation;
  handleModifyButton: (education: IEducation) => void;
  generation: number;
}

const CSContent = ({ education, handleModifyButton, generation }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const onclickContent = useCallback(() => {
    navigate(`/cs/start/?generation=${generation}&week=${education.week}`);
  }, [generation, education.week]);

  const onClickModifyButton = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    handleModifyButton(education);
  }, []);

  return (
    <Content
      onClick={onclickContent}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ContentWeek>{`${education.week}주차 문제`}</ContentWeek>
      <ContentTitle>{education.subject}</ContentTitle>
      {isHover && (
        <HoverContent>
          <ModifyIcon onClick={onClickModifyButton} />
        </HoverContent>
      )}
    </Content>
  );
};

export default CSContent;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background: #e4ecfd;
  margin: 20px 4px;
  cursor: pointer;
`;

const fontStyle = css`
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

const HoverContent = styled.div`
  position: absolute;
  inset: 0;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background: #e4ecfd;
  opacity: 0.8;

  > svg {
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    fill: #477feb;
  }
`;
