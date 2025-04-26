import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { Box, styled, TableCell } from '@mui/material';
import DailyCheckYearMonthButton from '../Organisms/DailyCheck/DailyCheckYearMonthButton';
import XrayRoom13 from '../templates/daily-checklist/XrayRoom13';
import XrayRoom15 from '../templates/daily-checklist/XrayRoom15';
import DailyCheckPrintButton from '../Organisms/DailyCheck/DailyCheckPrintButton';

const DailyChecklist = () => {
  const [dailyChecklistYear, setDailyChecklistYear] =
    React.useState<number>(2025);
  const [dailyChecklistMonth, setDailyChecklistMonth] =
    React.useState<number>(1);
  const [displayRoom, setDisplayRoom] = useState('13番撮影室');

  const StyledTableCell = styled(TableCell)(() => ({
    border: '1px solid black',
    padding: '0px',
    textAlign: 'center',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
  }));

  const getMonthlyLastDay = (year: number, month: number) => {
    // {year}年、{month-1}月、0日 ⇨ {year}年、{month}月、最終日となり、.getDate()で日にちを取得
    return new Date(year, month, 0).getDate();
  };

  // 指定した年月の日数を取得
  const daysInMonth = getMonthlyLastDay(
    dailyChecklistYear,
    dailyChecklistMonth - 1 + 1
  );
  // console.log(daysInMonth);

  const getDayInfo = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return {
      label: day,
      weekday: ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek],
      dayOfWeek,
    };
  };
  // console.log(getDayInfo(2025, 4, 24).weekday);

  const renderDisplayRoom = () => {
    switch (displayRoom) {
      case '13番撮影室':
        return (
          <XrayRoom13
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '15番撮影室':
        return (
          <XrayRoom15
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
    }
  };

  return (
    <>
      <Box>
        <DailyCheckYearMonthButton
          displayRoom={displayRoom}
          setDisplayRoom={setDisplayRoom}
          dailyChecklistYear={dailyChecklistYear}
          setDailyChecklistYear={setDailyChecklistYear}
          dailyChecklistMonth={dailyChecklistMonth}
          setDailyChecklistMonth={setDailyChecklistMonth}
        />

        {renderDisplayRoom()}

        <DailyCheckPrintButton />
        {/* <Outlet /> */}

        {/* <Link to='XrayRoom13' className='no-print'>
          13番撮影室
        </Link>
        <br />
        <Link to='XrayRoom15' className='no-print'>
          15番撮影室
        </Link> */}
      </Box>
    </>
  );
};

export default DailyChecklist;
