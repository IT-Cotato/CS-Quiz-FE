import React from 'react';
import { styled } from 'styled-components';

interface Props {
  /**
   * 토글 활성화 여부
   */
  toggled: boolean;
  /**
   * 토글 클릭시 발생하는 함수
   * @returns
   */
  onClick: () => void;
}

const ToggleButton = ({ toggled, onClick }: Props) => {
  return (
    <Label>
      <Input type="checkbox" defaultChecked={toggled} onClick={onClick} />
      <Toggle />
    </Label>
  );
};

export default ToggleButton;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 25px;
  margin: 10px;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Toggle = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: var(--text-1, #7b7b7b);
  transition: 0.3s;
  border-radius: 10px;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    flex-shrink: 0;
    left: 3px;
    bottom: 2.6px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }

  ${Input}:checked + & {
    background-color: #477feb;
  }

  ${Input}:checked + &:before {
    transform: translateX(22px);
  }
`;
