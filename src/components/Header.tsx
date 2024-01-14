import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '@assets/logo.svg';
import login from '@assets/login_icon.svg';
import joinus from '@assets/joinus_icon.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    });
  }, []);

  return (
    <Wrapper is_top={isTop.toString()}>
      <Logo src={logo} onClick={() => window.location.replace('/')} style={{ cursor: 'pointer' }} />
      <MenuSection>
        <MenuItem to="/">홈</MenuItem>
        <MenuItem to="/projects">프로젝트</MenuItem>
        <MenuItem to="/team">팀 멤버</MenuItem>
      </MenuSection>
      <LoginSection>
        <LoginWrapper>
          <img
            src={login}
            onClick={() => {
              navigate('/login');
            }}
          />
          <LoginItem to="/login">로그인</LoginItem>
        </LoginWrapper>
        <LoginWrapper>
          <img
            src={joinus}
            onClick={() => {
              navigate('/joinus');
            }}
          />
          <LoginItem to="/joinus">Join Us</LoginItem>
        </LoginWrapper>
      </LoginSection>
      <DropDownMenu isTop={isTop.toString()} />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div<{ is_top: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  /* 스크롤이 최상단이 아닐 시 효과 부여 */
  height: ${(props) => (props.is_top === 'true' ? '80px' : '72px')};
  border-bottom: ${(props) => (props.is_top === 'true' ? 'none' : '1px solid rgba(0, 0, 0, 0.1)')};
  box-shadow: ${(props) => (props.is_top === 'true' ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.25)')};
  transition: all 0.2s ease-in-out;
  padding: 0 60px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
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

const MenuItem = styled(NavLink)`
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
  &.active {
    color: #000;
    font-weight: 600;
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
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const LoginItem = styled.p`
  color: var(--pointcolor-4, #259c2e);
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  margin-left: 8px;
  font-family: NanumSquareRound;
`;
