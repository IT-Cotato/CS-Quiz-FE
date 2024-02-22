import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ArrowUp } from '@assets/arrow_up.svg';
import { ReactComponent as ArrowDown } from '@assets/arrow_down.svg';
import useSWRImmutable from 'swr/immutable';
import fetcher from '@utils/fetcher';
import { ICsOnSession, IEducation } from '@/typing/db';

interface Props {
  selectetdSession?: ICsOnSession;
  onChangeSession: (session: ICsOnSession) => void;
  education?: IEducation;
  generationId?: number;
}

const SessionSelect = ({ selectetdSession, onChangeSession, education, generationId }: Props) => {
  const { data: sessions } = useSWRImmutable<ICsOnSession[]>(
    `/v1/api/session/cs-on?generationId=${generationId}`,
    fetcher,
  );

  const [isOpen, setIsOpen] = useState(false);

  const sessionDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sessionDropRef.current && !sessionDropRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [sessionDropRef]);

  return (
    <SessionSelectWrapper ref={sessionDropRef}>
      <SelectMenu
        selected={selectetdSession ? 'selected' : 'unselected'}
        isopen={isOpen ? 'open' : 'close'}
        onClick={() => !education && setIsOpen(!isOpen)}
      >
        <p>
          {selectetdSession
            ? `${selectetdSession.sessionNumber}주차 세션`
            : '세션 주차를 선택하세요'}
        </p>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
        {isOpen && (
          <SessoinList>
            <ul>
              {sessions?.map((session, index) => (
                <li key={index} onClick={() => onChangeSession(session)}>
                  {`${session.sessionNumber}주차 세션`}
                </li>
              ))}
            </ul>
          </SessoinList>
        )}
      </SelectMenu>
    </SessionSelectWrapper>
  );
};

export default SessionSelect;

const SessionSelectWrapper = styled.div`
  position: relative;
  width: 500px;
`;

interface SelectMenuProps {
  selected: string;
  isopen: string;
}
const SelectMenu = styled.div<SelectMenuProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #f1f1f1;
  border: ${(props) => props.isopen === 'open' && '1px solid #7b7b7b'};

  > p {
    margin-left: 16px;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => (props.selected === 'selected' ? '#7B7B7B' : '#CECCCC')};
  }

  > svg {
    cursor: pointer;
    margin-right: 20px;

    > path {
      fill: #7b7b7b;
    }
  }
`;

const SessoinList = styled.div`
  z-index: 1;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  min-height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #7b7b7b;
  background: #f1f1f1;
  padding: 8px 0;

  ul {
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
  }

  li {
    display: flex;
    justify-content: flex-start;
    list-style: none;
    cursor: pointer;
    color: #7b7b7b;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 700;
    padding: 4px 16px;
  }
`;
