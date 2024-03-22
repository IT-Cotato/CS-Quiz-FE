import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ResetPW from './ResetPW';
import api from '@/api/api';

interface EmailAuthProps {
  goToNextStep: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailAuth: React.FC<EmailAuthProps> = ({ goToNextStep, email, setEmail }) => {
  const [inputs, setInputs] = useState<number[]>(Array(6).fill(null));
  const inputRef = useRef<any>([]);

  // 컴포넌트 마운트시 inputRef.current[0].focus() 실행
  useEffect(() => {
    inputRef.current[0]?.focus();
    console.log(inputRef);
  }, []);

  const handleInputChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    newInputs[idx] = parseInt(e.target.value);

    if (e.target.value.length === 1 && idx < 5) {
      inputRef.current[idx + 1]?.focus();
    }
    setInputs(newInputs);
  };

  const handleAuthCode = async () => {
    await api
      .get('/v1/api/auth/verification', {
        params: {
          email: email,
          code: inputs.join(''),
          type: 'find-password',
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.accessToken);
        alert('인증이 완료되었습니다.');
        localStorage.setItem('tokenForUpdatePW', res.data.accessToken);
      })
      .catch((err) => {
        console.log(err);
        alert('인증번호가 일치하지 않습니다.');
      });
  };

  const onSubmit = () => {
    if (!inputs.some((el) => el === null)) {
      handleAuthCode();
      goToNextStep();
    } else {
      alert('인증번호를 입력해주세요.');
    }
  };

  return (
    <Wrapper>
      <h3>승인 요청 이메일이 발송되었습니다.</h3>
      <p>
        <span>{email}</span>(으)로 인증 이메일이 발송 되었습니다.
        <br />
        이메일에서 코드 6자리를 아래 박스에 입력해주세요.
      </p>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          {inputs.map((input, idx) => (
            <InputBox
              key={idx}
              type="number"
              value={input}
              onChange={handleInputChange(idx)}
              ref={(el) => (inputRef.current[idx] = el)}
              filled={input !== null}
            />
          ))}
        </InputContainer>
        <p>
          인증 메일은 발송 시점부터 30분 유효하며,
          <br />
          재발송 시 기존 인증코드는 만료됩니다.
        </p>
        <Button type="submit" authorized={!inputs.some((el) => el === null)}>
          인증 완료
        </Button>
      </Form>
      <p>
        혹시 이메일을 못받으셨나요? <span>메일 다시 보내기</span>
      </p>
    </Wrapper>
  );
};

export default EmailAuth;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  h3 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 40px;
  }
  p {
    font-size: 1rem;
    margin: 0;
    text-align: center;
    span {
      color: #477feb;
      &:last-child {
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  margin-top: 40px;
  margin-bottom: 60px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const InputBox = styled.input<{ filled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.darkGray};
  ${({ filled, theme }) => filled && `border: 3px solid` + theme.color.lightBlue};
  border-radius: 16px;
  background: #fff;
  text-align: center;
  caret-color: transparent;
  color: #000;
  font-family: NanumSquareRound;
  font-size: 1.2rem;
  font-weight: 700;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Button = styled.button<{ authorized?: boolean }>`
  width: 500px;
  height: 52px;
  background: ${(props) => (props.authorized ? '#85C88A' : '#D7E5CA')};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 28px;
  border: none;
  font-family: NanumSquareRound;
  margin-top: 32px;
  &:hover {
    cursor: pointer;
  }
`;
