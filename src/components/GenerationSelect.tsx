import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import arrow_down_thin from '@assets/arrow_dwon_thin.svg';
import arrow_up_thin from '@assets/arrow_up_thin.svg';

interface Props {
  /**
   * 기수 변경시 발생해야 하는 로직을 담는 함수
   * @param generation
   * @returns
   */
  onChangeGeneration: (generation: number) => void;
  /**
   * 현재 선택된 기수
   */
  selectedGeneration: number;
}

const GenerationSelect = ({
  onChangeGeneration: onChangeGeneration,
  selectedGeneration: selectedGeneration,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [generationLength, setGenerationLength] = useState(selectedGeneration);

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

  useEffect(() => {
    // 기수의 최대값
    setGenerationLength(8);
  });

  const onClickGeneration = useCallback((generation: number) => {
    onChangeGeneration(generation);
    setIsOpen(false);
  }, []);

  return (
    <GenerationSelectWrapper ref={generationDropRef}>
      <SelectMenu isopen={isOpen ? 'open' : 'close'} onClick={() => setIsOpen(!isOpen)}>
        <p>{`${selectedGeneration}기`}</p>
        {isOpen ? (
          <img src={arrow_up_thin} alt="arrow-up" /> // onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <img src={arrow_down_thin} alt="arrow-down" /> // onClick={() => setIsOpen(!isOpen)} />
        )}
        {isOpen && (
          <GenerationList>
            <ul>
              {Array.from({ length: generationLength }, (v, i) => i + 1)
                .reverse()
                .map((generation) => (
                  <li
                    key={generation}
                    onClick={() => onClickGeneration(generation)}
                  >{`${generation}기`}</li>
                ))}
            </ul>
          </GenerationList>
        )}
      </SelectMenu>
    </GenerationSelectWrapper>
  );
};

export default GenerationSelect;

const GenerationSelectWrapper = styled.div`
  position: relative;
  width: 127px;
`;

const SelectMenu = styled.div<{ isopen: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid #bebebe;
  background: #f3f7ff;

  > p {
    margin-left: 16px;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    ${(props) =>
      props.isopen === 'open'
        ? css`
            color: #000;
            font-weight: 500;
          `
        : css`
            color: #969595;
            font-weight: 400;
          `}
  }

  > img {
    cursor: pointer;
    margin-right: 4px;
  }
`;

const GenerationList = styled.div`
  z-index: 1;
  position: absolute;
  top: 44px;
  width: 100%;
  flex-shrink: 0;
  border-radius: 5px;
  background: #fff;
  background: #f3f7ff;

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
    color: #000;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 12px 16px;
  }
`;
