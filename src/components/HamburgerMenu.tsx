import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  color?: string;
  pixel?: string;
  top?: string;
};

const HamburgerMenu = ({ color, pixel, top }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const role = localStorage.getItem('role');
  return (
    <MobileMenus color={color} pixel={pixel} top={top}>
      <div
        ref={ref}
        className="hamburger-menu"
        onClick={() => {
          if (ref.current) {
            ref.current.classList.toggle('open');
            setOpen(!open);
          }
        }}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={open ? 'menu-items open' : 'menu-items'}>
        <li>
          <MenuItem to="/">홈</MenuItem>
        </li>
        <li>
          <MenuItem to="/projects">프로젝트</MenuItem>
        </li>
        <li>
          <MenuItem to="/team">팀 멤버</MenuItem>
        </li>
        {role ? (
          <>
            <li>
              <MenuItem to="/cs">문제풀이</MenuItem>
            </li>
            <li>
              <MenuItem to="/session">세션 </MenuItem>
            </li>
            <li>
              <MenuItem to="/mypage">마이페이지 </MenuItem>
            </li>
          </>
        ) : (
          <>
            <li>
              <MenuItem to="/login">로그인</MenuItem>
            </li>
            <li>
              <MenuItem to="/joinus">Join us</MenuItem>
            </li>
          </>
        )}
      </div>
    </MobileMenus>
  );
};

const MobileMenus = styled.div<Props>`
  display: none;
  z-index: 100;

  @media screen and (max-width: ${(props) => props.pixel || '768px'}) {
    display: block;
    .hamburger-menu {
      width: 40px;
      height: 40px;
      position: relative;
      margin: ${(props) => props.top || '4px'} 0 0 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.5s ease-in-out;
      -moz-transition: 0.5s ease-in-out;
      -o-transition: 0.5s ease-in-out;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: ${(props) => props.color || '#e4e4e4'};
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
      }

      span:nth-child(1) {
        top: 0px;
      }
      span:nth-child(2),
      span:nth-child(3) {
        top: 10px;
      }
      span:nth-child(4) {
        top: 20px;
      }
    }

    .hamburger-menu.open {
      span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
      span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      }
      span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
      span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
    }

    .menu-items {
      display: none;
    }

    .menu-items.open {
      display: block;
      position: absolute;
      border-radius: 10px;
      background: #404040;
      right: 30px;
      list-style: none;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    }
  }
`;

const MenuItem = styled(Link)`
  @media screen and (max-width: 768px) {
    font-family: 'NanumSquareRound';
    color: #fff;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    margin: 0;
    &:hover {
      background-color: #ddd;
      color: #404040;
    }
  }
`;

export default HamburgerMenu;
