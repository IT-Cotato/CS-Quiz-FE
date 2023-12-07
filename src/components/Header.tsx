import React from 'react';
import styled from 'styled-components';
import logo from '@assets/logo.svg';
import login from '@assets/login_icon.svg';
import joinus from '@assets/joinus_icon.svg';
import { Link } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';

const Header = () => {
  return (
    <Wrapper>
      <Logo src={logo} onClick={() => window.location.replace('/')} style={{ cursor: 'pointer' }} />
      <MenuSection>
        <MenuItem to="/">홈</MenuItem>
        <MenuItem to="/projects">프로젝트</MenuItem>
        <MenuItem to="/team">팀 멤버</MenuItem>
      </MenuSection>
      <LoginSection>
        <LoginWrapper>
          <img src={login} />
          <LoginItem to="/login">로그인</LoginItem>
        </LoginWrapper>
        <LoginWrapper>
          <img src={joinus} />
          <LoginItem to="/joinus">Join Us</LoginItem>
        </LoginWrapper>
      </LoginSection>
      <DropDownMenu />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 72px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 0 60px;
  @media screen and (max-width: 960px) {
  }
`;

const Logo = styled.img`
  width: 144px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 100px;
  justify-content: space-between;
  /* width: 312px; */
  @media screen and (max-width: 1280px) {
    margin-right: -100px;
  }
`;

const MenuItem = styled(Link)`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  margin-right: 80px;
  font-family: NanumSquareRound;
  &:hover {
    color: #000;
  }
  @media screen and (max-width: 960px) {
    margin-right: 40px;
  }
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  @media screen and (max-width: 1280px) {
    margin-right: 100px;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-right: 40px; */
  width: 100px;
  img {
    width: 20px;
    height: 20px;
  }
`;

const LoginItem = styled(Link)`
  color: var(--pointcolor-4, #259c2e);
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  margin-left: 8px;
  font-family: NanumSquareRound;
`;
