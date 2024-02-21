import React, { ReactNode } from 'react';
import fetcher from '@utils/fetcher';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { styled } from 'styled-components';

interface Props {
  headerText: string;
  children: ReactNode;
}

const RoleApproveLayout = ({ headerText, children }: Props) => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);

  const navigate = useNavigate();

  if (user?.role !== 'ADMIN') {
    navigate('/mypage');
  }

  return (
    <FlexBox>
      <Wrapper>
        <Header>{headerText}</Header>
        {children}
      </Wrapper>
    </FlexBox>
  );
};

export default RoleApproveLayout;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 920px;
  width: 80%;
  min-height: 100vh;
  padding-bottom: 132px;
`;

const Header = styled.h1`
  margin: 132px 0 100px;
  color: #1d1d1d;
  font-family: NanumSquareRound;
  font-size: 28px;
  font-weight: 800;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  position: relative;
  width: 250px;
  height: 40px;
  margin-bottom: 20px;
`;

interface ButtonProps {
  position: string;
  active: string;
}
export const Button = styled.button<ButtonProps>`
  position: absolute;
  top: 0;
  ${(props) => props.position}: 0;
  width: 132px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  background: #8eaccd;
  opacity: ${(props) => (props.active === 'active' ? '1' : '0.3')};
  z-index: ${(props) => (props.active === 'active' ? '0' : '1')};

  &:active {
    z-index: 1;
    opacity: 0.3;
  }

  > p {
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-weight: 800;
    line-height: 160%;
    text-transform: capitalize;
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 28px 36px;
  box-sizing: border-box;
  margin: 20px 0;
  border-radius: 16px;
  background: #f3f7ff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);

  > p {
    color: #202020;
    text-align: center;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-weight: 800;
    text-transform: capitalize;
    margin: 8px 0;
  }
`;
