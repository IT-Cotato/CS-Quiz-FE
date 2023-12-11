import React, { useCallback, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import arrow_down_thin from '@assets/arrow_dwon_thin.svg';
import arrow_up_thin from '@assets/arrow_up_thin.svg';

/*
생각해 볼것

폰트는 어떻게 수정할지
*/

/*
수정 사항

화살표에 마진이 먹어서 아이콘보다 왼쪽을 클릭해도 반응
SeasonList 배경 피그마 나오면 변경
*/

/*
논의 사항


*/

interface Props {
  /**
   * 기수 변경시 발생해야 하는 로직을 담는 함수
   * @param season
   * @returns
   */
  onChangeSeason: (season: number) => void;
  /**
   * 현재 선택된 기수
   */
  selectedSeason: number;
}

const SeasonsSelect = ({ onChangeSeason, selectedSeason }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seasonLength, setSeasonLength] = useState(0);

  useEffect(() => {
    // 기수의 최대값을 받아와야 함
    setSeasonLength(8);
  }, [seasonLength]);

  const onClickSeason = useCallback((season: number) => {
    onChangeSeason(season);
    setIsOpen(false);
  }, []);

  return (
    <SeasonSelectWrapper>
      <SelectMenu isopen={isOpen ? 'open' : 'close'}>
        <p>{selectedSeason === 0 ? `기수 선택` : `${selectedSeason}기`}</p>
        {isOpen ? (
          <img src={arrow_up_thin} alt="arrow-up" onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <img src={arrow_down_thin} alt="arrow-down" onClick={() => setIsOpen(!isOpen)} />
        )}
        {isOpen && (
          <SeasonsList>
            <ul>
              {Array.from({ length: seasonLength }, (v, i) => i + 1)
                .reverse()
                .map((season) => (
                  <li key={season} onClick={() => onClickSeason(season)}>{`${season}기`}</li>
                ))}
            </ul>
          </SeasonsList>
        )}
      </SelectMenu>
    </SeasonSelectWrapper>
  );
};

export default SeasonsSelect;

const SeasonSelectWrapper = styled.div`
  position: relative;
  width: 127px;
`;

interface SelectMenuProps {
  isopen: string;
}
const SelectMenu = styled.div<SelectMenuProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid #bebebe;
  background: #fff;

  p {
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

  img {
    cursor: pointer;
    margin-right: 4px;
  }
`;

const SeasonsList = styled.div`
  position: absolute;
  top: 44px;
  width: 100%;
  flex-shrink: 0;
  border-radius: 5px;
  background: #fff;
  background: #e4e4e4;

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
    margin: 12px 16px;
  }
`;
