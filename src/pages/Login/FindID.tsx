import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';

const FindID = () => {
  const [tel, setTel] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isTel, setIsTel] = useState(false);

  const [showResult, setShowResult] = useState(false);

  const onChangeTel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const telRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      const telCurrent = e.target.value;
      setTel(telCurrent);
      if (!telRegex.test(telCurrent)) {
        setErrMessage('올바른 전화번호 형식이 아닙니다.');
        setIsTel(false);
      } else {
        setErrMessage('');
        setIsTel(true);
      }
    },
    [tel],
  );

  const onResultHandler = useCallback(() => {
    setShowResult(true);
  }, []);

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
  };

  const countryCode = [
    { value: '82', label: '+82' }, // 대한민국
    { value: '81', label: '+81' }, // 일본
    { value: '86', label: '+86' }, // 중국
    { value: '1', label: '+1' }, // 미국
    { value: '44', label: '+44' }, // 영국
    { value: '84', label: '+84' }, // 베트남
    { value: '65', label: '+65' }, // 싱가포르
    { value: '63', label: '+63' }, // 필리핀
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState(countryCode[0]);
  const handleOptionChange = (
    selectedOption: SingleValue<{ value: string; label: string }> | null,
  ) => {
    if (selectedOption === null) return;
    setSelectedOption(selectedOption);
    console.log(`선택된 국가코드:`, selectedOption);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(tel);
    },
    [tel],
  );

  return (
    <Wrapper>
      <h3>내 계정 ID 찾기</h3>
      <Container>
        {showResult ? (
          <ResultWrapper>
            <p>
              한승우님의 ID는 <span>co****@naver.com</span> 입니다.
            </p>
            <Button type="submit" bgColor={showResult} onClick={navigateToLogin}>
              계속
            </Button>
          </ResultWrapper>
        ) : (
          <InputWrapper>
            <p>내 계정 ID를 찾으려면, 회원가입 시 입력한 전화번호를 기입해주세요.</p>
            <Form onSubmit={onSubmit}>
              <InputSection>
                <StyledSelect
                  defaultValue={countryCode[0]}
                  isClearable={false}
                  isSearchable={false}
                  menuPortalTarget={document.body}
                  options={countryCode}
                  styles={customStyles}
                  onChange={handleOptionChange}
                />
                <InputBox>
                  <input
                    type="text"
                    id="tel"
                    name="tel"
                    placeholder="'-'를 제외한 숫자만 입력해주세요."
                    value={tel}
                    onChange={onChangeTel}
                  />
                  {!isTel && <Error>{errMessage}</Error>}
                </InputBox>
              </InputSection>
              <Button type="submit" bgColor={isTel} onClick={onResultHandler}>
                계속
              </Button>
            </Form>
          </InputWrapper>
        )}
      </Container>
    </Wrapper>
  );
};

export default FindID;

const customStyles = {
  control: (provided: any) => ({
    // select box의 스타일 설정
    ...provided,
    fontSize: '1rem',
    borderBottom: '1px solid #7b7b7b',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: '0px',
    outline: 'none',
    width: '160px',
    // border: state.isFocused ? 'none none 1px none' : 'none',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#477feb' : '#fff',
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none',
    color: '#7b7b7b',
  }),
};

const StyledSelect = styled(Select)`
  border: none;
  border-color: #fff;
  &:focus {
    border: none;
  }
  .react-select__control {
    border: none;
    /* cursor: pointer; */
  }
  .react-select__single-value {
    font-size: 1rem;
    font-weight: 400;
  }
  .react-select__option--is-selected {
    background-color: #477feb;
    color: white;
  }
  .react-select__option--is-focused {
    border: 1px solid #e4ecfd;
    color: black;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  h3 {
    font-size: 1.8rem;
    margin-bottom: 28px;
  }
  p {
    font-size: 1rem;
    margin-bottom: 40px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const InputSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 480px;
  justify-content: space-between;
  margin-bottom: 60px;
  .react-select-container {
    border: none;
    color: #fff;
  }
`;

const InputBox = styled.div`
  width: 280px;
  height: 40px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey};
  input {
    width: 280px;
    padding-top: 12px;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const Error = styled.p`
  color: #eb5353;
  font-size: 0.9rem !important;
  font-weight: 500;
  margin: 0;
  padding-left: 4px;
  padding-top: 12px;
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
  &:hover {
    cursor: pointer;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 1.1rem;
    font-weight: 700;
    width: 600px;
    margin-top: 69px;
    margin-bottom: 84px;
    text-align: center;
    span {
      color: ${({ theme }) => theme.color.green};
    }
  }
`;
