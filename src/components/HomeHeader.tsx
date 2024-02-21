import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeDropDownMenu from './HomeDropDownMenu';
import HamburgerMenu from './HamburgerMenu';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const HomeHeader = () => {
  const { data, error } = useSWR('/v1/api/member/info', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 6000000, // 10분동안은 데이터가 변경되지 않는 한 재요청이 발생하지 않음
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []);

  const role = data?.role;
  const name = data?.memberName;

  const NonMemberMenus = () => {
    return (
      <WindowUl>
        <li
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </li>
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
      </WindowUl>
    );
  };

  const MemberMenus = () => {
    return (
      <WindowUl>
        <li
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </li>
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
            navigate('/cs');
          }}
        >
          CS 문제풀이
        </li>
        <li
          onClick={() => {
            navigate('/session');
          }}
        >
          세션 기록
        </li>
      </WindowUl>
    );
  };

  return (
    <Wrapper>
      <div className="title">
        <span
          onClick={() => {
            navigate('/');
          }}
        >
          COTATO
        </span>
      </div>

      {role ? (
        <>
          {MemberMenus()}
          <Profile>
            <p>{name}</p>
          </Profile>
        </>
      ) : (
        <>
          {NonMemberMenus()}
          <HomeDropDownMenu />
        </>
      )}
      <HamburgerMenu />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  background: transparent;
  z-index: 999;
  position: absolute;
  top: 0;
  .title {
    height: 34px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
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
  @media screen and (max-width: 960px) {
    padding: 30px 20px;
  }
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    padding: 30px 20px;
  }
`;

const WindowUl = styled.ul`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
  list-style: none;
  margin: 0;
  z-index: 10;
  padding-left: 0;
  li {
    display: flex;
    align-items: center;
    height: 29px;
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
    cursor: pointer;
  }
  li + li {
    margin-right: 64px;
  }
  li:first-child {
    margin-right: 80px;
  }
  @media screen and (max-width: 960px) {
    li {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileMenus = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    .hamburger-menu {
      width: 40px;
      height: 40px;
      position: relative;
      margin: 4px 0 0 0;
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
        background: #e4e4e4;
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
  }
`;

const MobileUl = styled.ul``;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 36px;
  border-radius: 22px;
  background: linear-gradient(180deg, #6e6cfe 0%, rgba(189, 219, 255, 0.69) 100%);
  p {
    color: black;
    font-size: 16px;
  }
  margin-top: -8px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default HomeHeader;
