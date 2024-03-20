import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@assets/logo.svg';
import HamburgerMenu from './HamburgerMenu';
import fetchUserData from '@utils/fetchUserData';
//
//
//

interface MemberHeaderProps {
  showHeader?: boolean;
  setShowHeader?: (show: boolean) => void;
}

//
//
//

const MEMBER_ROLE_EMOJI_URL = {
  OLD_MEMBER:
    'https://velog.velcdn.com/images/ea_st_ring/post/74acb156-aa96-4cfa-8a79-2895315e4c0a/image.svg',
  MEMBER:
    'https://velog.velcdn.com/images/ea_st_ring/post/86f9975f-2c1c-467d-afe2-5bec019ce159/image.svg',
  ADMIN:
    'https://velog.velcdn.com/images/ea_st_ring/post/703c66cc-6518-4ea2-a80a-0be25bfd6d90/image.svg',
  EDUCATION:
    'https://velog.velcdn.com/images/ea_st_ring/post/703c66cc-6518-4ea2-a80a-0be25bfd6d90/image.svg',
  GENERAL:
    'https://velog.velcdn.com/images/ea_st_ring/post/a905da7e-e23e-40cd-a751-0d63067494f1/image.svg',
  REFUSED: '',
};

//
//
//

const MemberHeader: React.FC<MemberHeaderProps> = () => {
  const navigate = useNavigate();
  const { data: userData } = fetchUserData();

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
        <img src={MEMBER_ROLE_EMOJI_URL[userData.role] || ''} />
        <p onClick={() => navigate('mypage')}>{userData?.memberName}</p>
      </MyInfo>
      <HamburgerMenu color="#202020" top="16px" />
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
  @media screen and (max-width: 1280px) {
    width: 100px;
  }
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 200px;
  justify-content: space-between;
  /* width: 312px; */
  @media screen and (max-width: 1280px) {
    /* display: none; */
    margin-right: 0px;
  }
  @media screen and (max-width: 768px) {
    display: none;
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
  @media screen and (max-width: 1280px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 960px) {
    margin-right: 20px;
  }
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 60px;
  width: fit-content;
  img {
    width: 30px;
    height: 30px;
    margin-right: 4px;
    margin-bottom: 4px;
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
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
