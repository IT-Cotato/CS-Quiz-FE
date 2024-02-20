import { IGeneration } from '@/typing/db';
import fetcher from '@utils/fetcher';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';

interface Props {
  mode: string;
  selectedValue?: string;
  width: string;
  onChangeSelect?: () => void;
}

const RequestDropBox = ({ mode, selectedValue, width, onChangeSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: generationData } = useSWR<IGeneration[]>('/v1/api/generation', fetcher);

  const generationDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (generationDropRef.current && !generationDropRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [generationDropRef]);

  return (
    <SelectWrapper>
      <SelectMenu width={width}>
        {selectedValue ? selectedValue : mode === 'generation' ? '기수' : '포지션'}
      </SelectMenu>
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
  border-radius: 12px;
  background: #fff;

  > p {
    color: #5a5a5a;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
  }
`;
