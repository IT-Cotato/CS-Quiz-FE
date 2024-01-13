/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import EmailAuth from './EmailAuth';

const FindPW = () => {
  const [email, setEmail] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [showEmailAuth, setShowEmailAuth] = useState(false);

  const [isFindPage, setIsFindPage] = useState(true);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);
      if (!emailRegex.test(emailCurrent)) {
        setErrMessage('올바른 이메일 형식이 아닙니다.');
        setIsEmail(false);
      } else {
        setErrMessage('');
        setIsEmail(true);
      }
    },
    [email],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isEmail) {
        setShowEmailAuth(true);
        console.log(email);
      } else if (!isEmail && isFindPage) {
        alert('이메일을 입력해주세요.');
        return;
      } else {
        return;
      }
    },
    [email],
  );

  if (showEmailAuth) {
    return <EmailAuth />;
  }

  return (
    <Wrapper>
      <h3>비밀번호 찾기</h3>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>이메일</span>
          <InputBox
            type="text"
            id="id"
            name="id"
            placeholder="아이디를 기입해주세요."
            value={email}
            onChange={onChangeEmail}
          />
          {!isEmail && <Error>{errMessage}</Error>}
        </Label>
        <Button type="submit" bgColor={isEmail}>
          인증 이메일 보내기
        </Button>
      </Form>
    </Wrapper>
  );
};

export default FindPW;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  h3 {
    font-size: 1.8rem;
    margin-bottom: 56px;
  }
  p {
    font-size: 1rem;
    margin-bottom: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-bottom: 20px;
  font-size: 1rem;
  span {
    padding-left: 4px;
  }
  p {
    margin: 0;
  }
`;

const InputBox = styled.input`
  width: 480px !important;
  height: 52px;
  border-radius: 10px;
  border: 2px solid #d7e5ca !important;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  width: 512px;
  margin-top: 4px;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`;

const Error = styled.p`
  color: #eb5353;
  font-size: 0.9rem !important;
  font-weight: 500;
  margin: 0;
  padding-left: 4px;
  padding-top: 4px;
`;

const Button = styled.button<{ bgColor?: boolean }>`
  width: 500px;
  height: 52px;
  background: ${(props) => (props.bgColor ? '#85C88A' : '#D7E5CA')};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 28px;
  border: none;
  font-family: NanumSquareRound;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
`;
