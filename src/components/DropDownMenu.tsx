import React, { useState } from 'react';
import styled from 'styled-components';
import arrowDown from '@assets/arrow_down.svg';
import arrowUp from '@assets/arrow_up.svg';
import { Link } from 'react-router-dom';

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: '-100px' }}>
      {isOpen ? (
        <OpenedMenu>
          <MenuWrapper>
            <p>Members Only</p>
            <img onClick={() => setIsOpen(!isOpen)} src={isOpen ? arrowUp : arrowDown} />
          </MenuWrapper>
          <ul>
            <li>
              <MenuItem to="/session">세션기록</MenuItem>
            </li>
            <li>
              <MenuItem to="/cs">CS 문제풀이</MenuItem>
            </li>
            <li>
              <MenuItem to="/mypage">마이페이지</MenuItem>
            </li>
          </ul>
        </OpenedMenu>
      ) : (
        <ClosedMenu>
          <MenuWrapper>
            Members Only
            <img onClick={() => setIsOpen(!isOpen)} src={isOpen ? arrowUp : arrowDown} />
          </MenuWrapper>
        </ClosedMenu>
      )}
    </div>
  );
};

export default DropDownMenu;

const OpenedMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 120px;
  position: relative;
  color: #93c6fe;
  font-size: 1.2rem;
  font-weight: 500;
  /* margin-left: 36px; */
  width: 208px;
  height: 168px;
  border: 3px solid #93c6fe;
  border-radius: 44px;
  background-color: #fff;
  img {
    width: 20px;
    margin-left: 10px;
  }
  ul {
    margin-top: 40px;
    margin-right: 40px;
    position: absolute;
    list-style: none;
    top: 20px;
    transform: translateY(0);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease,
      visibility 0.4s;
  }
  li {
    font-family: NanumSquareRound;
    margin-bottom: 8px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1.1rem;
  p {
    margin-top: 13px;
  }
`;

const MenuItem = styled(Link)`
  color: #93c6fe;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-decoration: none;
`;

const ClosedMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #93c6fe;
  background-color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  /* margin-left: 36px; */
  width: 208px;
  height: 48px;
  border: 3px solid #93c6fe;
  border-radius: 50px;
  img {
    width: 20px;
    margin-left: 10px;
  }
`;
