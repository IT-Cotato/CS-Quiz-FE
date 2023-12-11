import React, { useCallback, useState } from 'react';
import { css, styled } from 'styled-components';
import arrow_down_thin from '@assets/arrow_dwon_thin.svg';
import arrow_up_thin from '@assets/arrow_up_thin.svg';

// interface Props {
//   onSelect: () => void;
// }

/*

SeasonList를 ul로 잡지 말고 wrapper로 감싸서 구현할 방법 생각

 */

/*

기수 선택시 박스 안에 기수가 어디 위치에 보여질지 디자인 필요
seaons 배열에서 일단 8기로 잡나왔지만, 어떻게 동적으로 바뀔지는 프론트들이랑 얘기가 필요할 듯

*/

const SeasonsSelect = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSeason, setSelectedSeason] = useState(0);

  const seasons = Array.from({ length: 8 }, (v, i) => i + 1).reverse();

  const onClickSeason = useCallback((season: number) => {
    setSelectedSeason(season);
    setIsOpen(false);
  }, []);

  return (
    <SelectMenu isopen={isOpen}>
      <p>{selectedSeason === 0 ? `기수 선택` : `${selectedSeason}기`}</p>
      {isOpen ? (
        <img src={arrow_up_thin} alt="arrow-up" onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <img src={arrow_down_thin} alt="arrow-down" onClick={() => setIsOpen(!isOpen)} />
      )}
      {isOpen && (
        <SeasonsList>
          {seasons.map((season) => (
            <li key={season} onClick={() => onClickSeason(season)}>{`${season}기`}</li>
          ))}
        </SeasonsList>
      )}
    </SelectMenu>
  );
};

export default SeasonsSelect;

interface SelectMenuProps {
  isopen: boolean;
}

const SelectMenu = styled.div<SelectMenuProps>`
  position: relative;
  width: 127px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid #bebebe;
  background: #fff;

  p {
    position: absolute;
    top: -3px;
    left: 10px;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    ${(props) =>
      !props.isopen
        ? css`
            color: #969595;
            font-weight: 400;
          `
        : css`
            color: #000;
            font-weight: 500;
          `}

    line-height: normal;
  }

  img {
    cursor: pointer;
    position: absolute;
    top: 4.5px;
    right: 6px;
  }
`;

const SeasonsList = styled.ul`
  position: absolute;
  top: 26px;
  left: -1.6px;
  width: 90px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #fff;
  background: #e4e4e4;

  li {
    list-style: none;
    cursor: pointer;
    color: #000;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 8px;
    margin-left: -110px;
  }
`;
