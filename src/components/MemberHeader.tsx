import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@assets/logo.svg';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface MemberHeaderProps {
  showHeader?: boolean;
  setShowHeader?: (show: boolean) => void;
}

const MemberHeader: React.FC<MemberHeaderProps> = ({ showHeader, setShowHeader }) => {
  const { data, error } = useSWR('/v1/api/member/info', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 6000000, // 10분동안은 데이터가 변경되지 않는 한 재요청이 발생하지 않음
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Wrapper>
      <Logo src={logo} onClick={() => window.location.replace('/')} style={{ cursor: 'pointer' }} />
      <MenuSection>
        <MenuItem to="/">홈</MenuItem>
        <MenuItem to="/projects">프로젝트</MenuItem>
        <MenuItem to="/team">팀 멤버</MenuItem>
        <MenuItem to="/cs">CS 문제풀이</MenuItem>
        <MenuItem to="/session">세션 기록</MenuItem>
      </MenuSection>
      <MyInfo>
        <img src="https://raw.githubusercontent.com/MinJaeSon/assets/f29298dfeed8daa40622f7d9568a0421f5183756/potato.svg" />
        <p onClick={() => navigate('mypage')}>{data?.memberName}</p>
      </MyInfo>
    </Wrapper>
  );
};

export default MemberHeader;

const Wrapper = styled.div<{ showHeader?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 72px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 0 60px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 100 !important;
  animation: ${(props) =>
    props.showHeader ? 'slide_down 0.3s ease-in-out;' : 'slide_up 0.3s ease-in-out;'};
  @keyframes slide_up {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slide_down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  @media screen and (max-width: 960px) {
  }
`;

const Logo = styled.img`
  width: 144px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 200px;
  justify-content: space-between;
  /* width: 312px; */
  @media screen and (max-width: 1280px) {
    margin-right: 0px;
  }
`;

const MenuItem = styled(Link)`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  margin-right: 68px;
  font-family: NanumSquareRound;
  &:hover {
    color: #000;
  }
  @media screen and (max-width: 960px) {
    margin-right: 40px;
  }
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 60px;
  width: fit-content;
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  p {
    font-size: 1.1rem;
    font-weight: 400;
    color: #000;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 1.2px;
    }
  }
`;
