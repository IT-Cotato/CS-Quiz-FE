/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ResetPWProps {
  isPassword: boolean;
  setIsPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordCheck: boolean;
  setIsPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
  mismatchError: boolean;
  setMismatchError: React.Dispatch<React.SetStateAction<boolean>>;
  isEmail: boolean;
  setIsEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPW: React.FC<ResetPWProps> = ({
  isPassword,
  setIsPassword,
  isPasswordCheck,
  setIsPasswordCheck,
  mismatchError,
  setMismatchError,
  isEmail,
  setIsEmail,
}) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  // const [mismatchError, setMismatchError] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');

  // const [isPassword, setIsPassword] = useState(false);
  // const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('password: ' + password + '\n' + 'passwordCheck: ' + passwordCheck);
      console.log(isPassword, isPasswordCheck, mismatchError, isEmail);
      if (isPassword && isPasswordCheck && !mismatchError && isEmail) {
        console.log(password);
        alert('비밀번호 변경이 완료되었습니다.');
        navigate('/signin');
      } else {
        alert('입력값을 확인해주세요.');
        return;
      }
    },
    [password, passwordCheck],
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage('8-16자 영문 대 소문자, 숫자를 사용하세요.');
        setIsPassword(false);
      } else {
        setPasswordMessage('');
        setIsPassword(true);
      }
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      if (e.target.value === password) {
        setIsPasswordCheck(true);
        setMismatchError(false);
      } else {
        setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
        setIsPasswordCheck(false);
        setMismatchError(true);
      }
    },
    [password],
  );

  return (
    <Wrapper>
      <h3>비밀번호 재설정</h3>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>비밀번호</span>
          <InputBox
            type="password"
            id="password"
            name="password"
            placeholder="8-16자 영문 대 소문자, 숫자를 사용하세요."
            value={password}
            onChange={onChangePassword}
          />
          {!isPassword && <Error>{passwordMessage}</Error>}
        </Label>
        <Label>
          <span>비밀번호 확인</span>
          <InputBox
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {mismatchError && <Error>{passwordCheckMessage}</Error>}
        </Label>
        <Button type="submit" bgColor={isPassword && isPasswordCheck && !mismatchError}>
          비밀번호 재설정
        </Button>
      </Form>
    </Wrapper>
  );
};

export default ResetPW;

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
