/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SignUpModal from '@components/SignUpModal';

const SignUp = () => {
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
  const showModal = () => {
    setIsModalOpen(true);
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
    // const telRegex = /^\d{9,11}$/;
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
      }
    },
    [id, password, passwordCheck, name, tel, mismatchError],
  );

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
          <button type="submit" onClick={showModal}>
            가입신청
          </button>
          {isModalOpen && <SignUpModal />}
          <button>가입취소</button>
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
  button {
    width: 200px;
    height: 52px;
    font-size: 1.1rem;
    font-weight: 400;
    border-radius: 10px;
    border: 1px solid #d7e5ca;
    background: ${({ theme }) => theme.color.lightGreen};
    color: #fff;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Error = styled.p`
  color: #eb5353;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  padding-left: 4px;
`;
