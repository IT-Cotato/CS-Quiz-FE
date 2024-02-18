import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeDropDownMenu from './HomeDropDownMenu';

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <span
        onClick={() => {
          navigate('/');
        }}
      >
        COTATO
      </span>
      <ul>
        <li>홈</li>
        <li
          onClick={() => {
            navigate('/projects');
          }}
        >
          프로젝트
        </li>
        <li
          onClick={() => {
            navigate('/team');
          }}
        >
          팀 멤버
        </li>
        <li
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </li>
        <li
          onClick={() => {
            navigate('/joinus');
          }}
        >
          Join us
        </li>
        <HomeDropDownMenu />
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 50px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: transparent;
  z-index: 10;
  position: absolute;
  top: 0;
  span {
    z-index: 10;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.28px;
    cursor: pointer;
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    list-style: none;
    margin: 0;
    z-index: 10;
    cursor: pointer;
    li {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      margin-right: 40px;
      z-index: 10;
      font-family: NanumSquareRound;
      &:hover {
        color: #fff;
        font-weight: 600;
      }
    }
    li + li {
      margin-right: 64px;
    }
    li:first-child {
      margin-right: 80px;
    }
  }
`;

export default HomeHeader;
