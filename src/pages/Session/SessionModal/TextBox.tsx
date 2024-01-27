import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface Props {
  value: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  textType: string;
}

const TextBox = ({ value, onChange, textType }: Props) => {
  return (
    <Box height={textType === 'title' ? '60px' : '112px'}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={textType === 'title' ? '제목을 입력하세요.' : '내용을 입력하세요.'}
        readOnly={textType === 'title'}
      />
    </Box>
  );
};

export default React.memo(TextBox);

const Box = styled.div<{ height: string }>`
  display: flex;
  width: 500px;
  height: ${(props) => props.height};
  border-radius: 10px;
  background: #f1f1f1;
  margin-top: 10px;

  > textarea {
    width: 100%;
    height: auto;
    background-color: transparent;
    border: none;
    resize: none;
    padding: 20px;

    color: #7b7b7b;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    &::placeholder {
      color: #a1a1a1;
    }

    &:focus {
      outline: none;
    }
  }
`;
