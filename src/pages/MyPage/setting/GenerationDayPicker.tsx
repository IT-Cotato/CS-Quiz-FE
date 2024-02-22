import React, { useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import { styled } from 'styled-components';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dates: Date[] | undefined;
  setDates: React.Dispatch<React.SetStateAction<Date[] | undefined>>;
}

const GenerationDayPicker = ({ isOpen, setIsOpen, dates, setDates }: Props) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [calendarRef]);

  useEffect(() => {
    if (dates && dates.length === 2) {
      setIsOpen(false);
    }
  }, [dates]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div ref={calendarRef}>
      <StyledDayPicker
        locale={ko}
        mode="multiple"
        max={2}
        selected={dates}
        onSelect={setDates}
        showOutsideDays
      />
    </div>
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
