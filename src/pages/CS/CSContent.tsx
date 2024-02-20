import React, { useCallback, useState } from 'react';
import { styled, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ModifyIcon } from '@assets/modify_icon.svg';
import background from '@assets/cs_content_background.svg';
import { IGeneration, IEducation } from '@/typing/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface Props {
  education: IEducation;
  handleModifyButton: (education: IEducation) => void;
  generation?: IGeneration;
}

const CSContent = ({ education, handleModifyButton, generation }: Props) => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const onclickContent = useCallback(() => {
    navigate(
      `/cs/start/?generationId=${generation?.generationId}&educationId=${education.educationId}&educationNumber=${education.educationNumber}`,
      {
        state: {
          subject: education.subject,
        },
      },
    );
  }, [generation?.generationId, education.educationNumber]);

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
      <ContentWeek>{`${education.educationNumber}주차 문제`}</ContentWeek>
      <ContentTitle>{education.subject}</ContentTitle>
      {user?.role === 'ADMIN' && isHover && (
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
  background: #fff;
  background-image: url(${background});
  background-size: cover;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.07))
    drop-shadow(-4px -4px 4px rgba(0, 0, 0, 0.07));
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
  top: 16px;
  left: 28px;
  ${fontStyle}
  font-size: 16px;
  font-weight: 800;
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
  background: transparent;
  opacity: 0.8;

  > svg {
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    fill: #477feb;
  }
`;
