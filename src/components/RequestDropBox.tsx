import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IGeneration } from '@/typing/db';
import fetcher from '@utils/fetcher';
import { styled } from 'styled-components';
import { ReactComponent as ArrowDown } from '@assets/arrow_dwon_thin.svg';
import { ReactComponent as ArrowUp } from '@assets/arrow_up_thin.svg';
import useSWR from 'swr';
import generationSort from '@utils/generationSort';

interface Props {
  mode: string;
  width: string;
  selectedGeneration?: IGeneration;
  selectedPosition?: string;
  onChangeGeneration?: (selectedGeneration: IGeneration) => void;
  onChangePosition?: (selectedPosition: string) => void;
}

const positions = ['백엔드', '프론트엔드', '디자인', '기획'];

const RequestDropBox = ({
  mode,
  width,
  selectedGeneration,
  selectedPosition,
  onChangeGeneration,
  onChangePosition,
}: Props) => {
  const { data: generationData } = useSWR<IGeneration[]>('/v1/api/generation', fetcher);

  const [generations, setGenerations] = useState<IGeneration[]>();
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

  useEffect(() => {
    if (generationData) {
      setGenerations(generationSort(generationData));
    }
  }, [generationData]);

  const getSelectedValue = useCallback(() => {
    if (mode === 'generation') {
      if (selectedGeneration) {
        return `${selectedGeneration.generationNumber}기`;
      } else {
        return '기수';
      }
    } else if (mode === 'position') {
      if (selectedPosition) {
        return selectedPosition;
      } else {
        return '포지션';
      }
    }
  }, [mode, selectedGeneration, selectedPosition]);

  const onClickGeneration = useCallback(
    (generation: IGeneration) => {
      if (onChangeGeneration) onChangeGeneration(generation);
      setIsOpen(false);
    },
    [selectedGeneration],
  );

  const onClickPosition = useCallback(
    (position: string) => {
      if (onChangePosition) onChangePosition(position);
      setIsOpen(false);
    },
    [selectedGeneration],
  );

  return (
    <SelectWrapper ref={dropRef}>
      <SelectMenu width={width} onClick={() => setIsOpen(!isOpen)}>
        <p>{getSelectedValue()}</p>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </SelectMenu>
      {isOpen && (
        <SelectList>
          <ul>
            {mode === 'generation'
              ? generations?.map((generation) => (
                  <li key={generation.generationId} onClick={() => onClickGeneration(generation)}>
                    {`${generation.generationNumber}기`}
                  </li>
                ))
              : positions.map((position, index) => (
                  <li key={index} onClick={() => onClickPosition(position)}>
                    {position}
                  </li>
                ))}
          </ul>
        </SelectList>
      )}
    </SelectWrapper>
  );
};

export default RequestDropBox;

const SelectWrapper = styled.div`
  position: relative;
  height: 36px;
`;

const SelectMenu = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 100%;
  border: 2px solid #deead4;
  border-radius: 10px;
  background: #fff;

  > p {
    color: #5a5a5a;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
    margin-left: 4px;
  }

  svg {
    cursor: pointer;

    path {
      fill: #848484;
    }
  }
`;

const SelectList = styled.div`
  z-index: 1;
  position: absolute;
  top: 36px;
  left: 0;
  width: 100%;
  min-height: 36px;
  flex-shrink: 0;
  border: 2px solid #deead4;
  border-radius: 10px;
  background: #fff;

  > ul {
    display: flex;
    flex-direction: column;
    padding: 4px;
    margin: 0px;

    > li {
      display: flex;
      justify-content: center;
      list-style: none;
      cursor: pointer;
      color: #5a5a5a;
      font-family: NanumSquareRound;
      font-size: 16px;
      font-weight: 400;
      text-transform: capitalize;
      padding: 4px;
    }
  }
`;
