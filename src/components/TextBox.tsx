import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface Props {
  value: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  height: string;
  readOnly?: boolean;
}

const TextBox = ({ value, placeholder, onChange, height, readOnly }: Props) => {
  return (
    <Box height={height}>
      <textarea value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} />
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
  margin: 4px;

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
