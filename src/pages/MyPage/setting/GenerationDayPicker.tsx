import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import { styled } from 'styled-components';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenerationDayPicker = ({ isOpen, setIsOpen }: Props) => {
  const [days, setDays] = useState<Date[]>();

  const calendarRef = useRef(null);

  // useEffect(() => {
  //   const handleClick = (e: any) => {
  //     if (calendarRef.current && !calendarRef.current.contains(e.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   window.addEventListener('mousedown', handleClick);
  //   return () => window.removeEventListener('mousedown', handleClick);
  // }, [calendarRef]);

  if (isOpen) {
    return <></>;
  }

  return (
    <StyledDayPicker
      // ref={calendarRef}
      locale={ko}
      mode="multiple"
      max={2}
      selected={days}
      onSelect={setDays}
    />
  );
};

export default React.memo(GenerationDayPicker);

const StyledDayPicker = styled(DayPicker)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #b2b2b2;
  border-radius: 12px;

  --rdp-accent-color: #1e1e1e;
  --rdp-background-color: none;

  .rdp-months {
    margin: 12px;

    .rdp-head {
      font-family: NanumSquareRound;
      font-size: 20px;
    }

    .rdp-tbody {
      font-family: NanumSquareRound;
      font-weight: 300;

      .rdp-day_today {
        font-weight: 300;
      }
    }
  }
`;
