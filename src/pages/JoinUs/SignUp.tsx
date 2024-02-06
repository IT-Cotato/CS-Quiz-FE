/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SignUpModal from '@components/SignUpModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import api from '@/api/api';

const SignUp = () => {
  const { data, error } = useSWR('', fetcher);

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [mismatchError, setMismatchError] = useState(false);

  // 오류 메시지
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [telMessage, setTelMessage] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isTel, setIsTel] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onApply = () => {
    if (isId && isPassword && !mismatchError && isName && isTel) {
      setIsModalOpen(true);
    } else {
      alert('입력값을 확인해주세요.');
      setIsModalOpen(false);
    }
  };

  const onCancel = () => {
    if (confirm('가입을 취소합니다.')) {
      navigate('/');
    }
  };

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setId(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setIdMessage('올바른 이메일 형식이 아닙니다!');
      setIsId(false);
    } else {
      setIdMessage('');
      setIsId(true);
    }
  }, []);

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
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameMessage('필수 입력 항목입니다!');
      setIsName(false);
    } else {
      setNameMessage('');
      setIsName(true);
    }
  }, []);

  const onChangeTel = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // const telRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    setTel(e.target.value);
    if (!e.target.value) {
      setTelMessage('필수 입력 항목입니다!');
      setIsTel(false);
    } else {
      setTelMessage('');
      setIsTel(true);
    }
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(id, password, passwordCheck, name, tel);
      if (!mismatchError) {
        console.log('서버로 회원가입하기');
        try {
          api.post('/v1/api/auth/join', {
            email: id,
            password: password,
            name: name,
            phoneNumber: tel,
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    [id, password, passwordCheck, name, tel, mismatchError],
  );

  if (data) {
    console.log(data);
    navigate('/');
  }

  return (
    <Wrapper>
      <h3>회원가입</h3>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>아이디</span>
          <InputBox
            type="text"
            id="id"
            name="id"
            placeholder="이메일 형식으로 작성해주세요."
            value={id}
            onChange={onChangeId}
          />
          {!isId && <Error>{idMessage}</Error>}
        </Label>
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
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
        </Label>
        <Label>
          <span>이름</span>
          <InputBox type="text" id="name" name="name" value={name} onChange={onChangeName} />
          {!isName && <Error>{nameMessage}</Error>}
        </Label>
        <Label>
          <span>전화번호</span>
          <InputBox
            type="tel"
            id="tel"
            name="tel"
            placeholder="'-'를 제외한 숫자만 입력해주세요."
            value={tel}
            onChange={onChangeTel}
          />
          {!isTel && <Error>{telMessage}</Error>}
        </Label>
        <ButtonSection>
          <Button
            type="submit"
            onClick={onApply}
            bgColor={isId && isPassword && !mismatchError && isName && isTel}
          >
            가입신청
          </Button>
          {isModalOpen && <SignUpModal />}
          <Button onClick={onCancel}>가입취소</Button>
        </ButtonSection>
      </Form>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  h3 {
    font-size: 1.5rem;
    margin-bottom: 56px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Label = styled.label`
  margin-bottom: 20px;
  font-size: 1rem;
  span {
    padding-left: 4px;
  }
`;

const InputBox = styled.input`
  width: 600px !important;
  height: 52px;
  border-radius: 10px;
  border: 2px solid #d7e5ca !important;
  background: #fff;
  margin-bottom: 12px;
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

const ButtonSection = styled.div`
  width: 600px;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 48px;
`;

const Button = styled.button<{ bgColor?: boolean }>`
  width: 200px;
  height: 52px;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 10px;
  border: 1px solid #d7e5ca;
  background: ${(props) => (props.bgColor ? '#85C88A' : '#D7E5CA')};
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

const Error = styled.p`
  color: #eb5353;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  padding-left: 4px;
`;
