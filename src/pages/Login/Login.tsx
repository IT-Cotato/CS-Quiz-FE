/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import line from '@assets/Line 1.svg';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import api from '@/api/api';

const Login = () => {
  const { data, error, mutate } = useSWR('/v1/api/member/info', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // 서버 리소스를 한번 받아오고 나서는 다시 받아오지 않음
  });

  const nagivate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoginError(false);
      api
        .post('/login', {
          email: id,
          password: password,
        })
        .then((res) => {
          console.log(res.headers.accesstoken);
          localStorage.setItem('token', res.headers.accesstoken);
          mutate('/v1/api/member/info'); // 로그인 후에는 swr 요청을 수동으로 해준다
        })
        .catch((error) => {
          console.log(error);
          setLoginError(true);
          if (id === '' || password === '') {
            alert('아이디 또는 비밀번호를 입력해주세요');
          } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          }
        });
    },
    [id, password],
  );

  if (data) {
    console.log(data);
    window.location.href = '/';
  }

  return (
    <Wrapper>
      <h3>로그인</h3>
      <Form onSubmit={onSubmit}>
        <InputBox>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/fc85a00960fa2f2a33ed4409b435484864454f73/icon_user.svg" />
          <input type="text" id="id" name="id" placeholder="아이디" onChange={onChangeId} />
        </InputBox>
        <InputBox>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/fc85a00960fa2f2a33ed4409b435484864454f73/icon_unlock.svg" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
          />
        </InputBox>
        <LoginButton type="submit">로그인</LoginButton>
      </Form>
      <LinkContainer>
        <StyledLink to="/findpw">비밀번호 찾기</StyledLink>
        <img src={line} />
        <StyledLink to="/findid">아이디 찾기</StyledLink>
        <img src={line} />
        <StyledLink to="/joinus">회원가입</StyledLink>
      </LinkContainer>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  h3 {
    font-size: 1.5rem;
    margin-bottom: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const InputBox = styled.div`
  width: 600px;
  height: 52px;
  border-radius: 10px;
  border: 2px solid #d7e5ca;
  background: #fff;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    border: none;
    width: 512px;
    &:focus {
      outline: none;
    }
  }
  img {
    width: 16px;
    height: 16px;
    margin-left: 20px;
    margin-right: 8px;
  }

  @media screen and (max-width: 768px) {
    width: 440px;
  }
  @media screen and (max-width: 392px) {
    width: 340px;
  }
`;

const LoginButton = styled.button`
  width: 600px;
  height: 52px;
  border-radius: 10px;
  border: 1px solid #d7e5ca;
  background: ${({ theme }) => theme.color.lightGreen};
  margin-top: 48px;
  font-size: 1.1rem;
  font-weight: 400;
  color: #fff;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 440px;
  }
  @media screen and (max-width: 392px) {
    width: 340px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 52px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 1px 0px #cecccc inset;
  img {
    margin: 0 8px;
    height: 16px;
  }

  @media screen and (max-width: 768px) {
    width: 440px;
  }
  @media screen and (max-width: 392px) {
    width: 340px;
    height: 48px;
    margin-top: 20px;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.grey};
  text-align: center;
  text-decoration: none;
  font-size: 0.9rem;

  @media screen and (max-width: 392px) {
    font-size: 0.8rem;
  }
`;
