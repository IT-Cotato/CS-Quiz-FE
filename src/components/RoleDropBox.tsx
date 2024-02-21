import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ArrowDown } from '@assets/arrow_dwon_thin.svg';
import { ReactComponent as ArrowUp } from '@assets/arrow_up_thin.svg';
import { IRole } from '@/typing/db';

interface Props {
  selectedRole?: IRole;
  onChangeRole: (selectedRole: IRole) => void;
}

const roles: IRole[] = [
  { name: '운영진', color: '#477FEB' },
  { name: '교육 팀원', color: '#259C2E' },
  { name: '일반 부원', color: '#7B7B7B' },
];

const RoleDropBox = ({ selectedRole, onChangeRole }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [dropRef]);

  const onClickRole = useCallback((role: IRole) => {
    onChangeRole(role);
    setIsOpen(false);
  }, []);

  return (
    <SelectWrapper ref={dropRef}>
      <SelectMenu
        color={selectedRole ? selectedRole.color : '#bebebe'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{selectedRole ? selectedRole.name : '역할 선택'}</p>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </SelectMenu>
      {isOpen && (
        <SelectList color={selectedRole ? selectedRole.color : '#bebebe'}>
          <ul>
            {roles.map((role, index) => (
              <List key={index} color={role.color} onClick={() => onClickRole(role)}>
                {role.name}
              </List>
            ))}
          </ul>
        </SelectList>
      )}
    </SelectWrapper>
  );
};

export default RoleDropBox;

const SelectWrapper = styled.div`
  position: relative;
  width: 120px;
`;

const SelectMenu = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid ${(props) => props.color};
  background: #fff;

  > p {
    color: ${(props) => (props.color === '#bebebe' ? '#1c1c1c' : props.color)};
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 400;
    margin-left: 4px;
  }

  > svg {
    cursor: pointer;

    path {
      fill: ${(props) => (props.color === '#bebebe' ? '#7b7b7b' : props.color)};
    }
  }
`;

const SelectList = styled.div<{ color: string }>`
  z-index: 1;
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  min-height: 40px;
  flex-shrink: 0;
  border: 2px solid ${(props) => props.color};
  border-radius: 5px;
  background: #fff;

  ul {
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
  }
`;

const List = styled.li<{ color: string }>`
  display: flex;
  justify-content: flex-start;
  list-style: none;
  cursor: pointer;
  color: ${(props) => props.color};
  font-family: NanumSquareRound;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 16px;
`;
