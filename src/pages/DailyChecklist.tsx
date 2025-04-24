import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { Box, styled, TableCell } from '@mui/material';
import DailyCheckYearMonthButton from '../Organisms/DailyCheck/DailyCheckYearMonthButton';
import XrayRoom13 from '../templates/daily-checklist/XrayRoom13';
import XrayRoom15 from '../templates/daily-checklist/XrayRoom15';
import { InspectionCategory } from '../types';
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

  const HeaderTableCell = styled(StyledTableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  });

  const getMonthlyLastDay = (year: number, month: number) => {
    // {year}年、{month-1}月、0日 ⇨ {year}年、{month}月、最終日となり、.getDate()で日にちを取得
    return new Date(year, month, 0).getDate();
  };

  // 指定した年月の日数を取得
  const daysInMonth = getMonthlyLastDay(
    dailyChecklistYear,
    dailyChecklistMonth - 1 + 1
  );
  console.log(daysInMonth);

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

  const shouldRenderCell = (day: number, frequency: string): boolean => {
    const { dayOfWeek } = getDayInfo(
      dailyChecklistYear,
      dailyChecklistMonth,
      day
    );
    switch (frequency) {
      case 'daily_weekdays':
        return dayOfWeek >= 1 && dayOfWeek <= 5; // 月〜金を表示
      case 'weekly_friday':
        return dayOfWeek === 5; // 金曜日のみ
      case 'monthly_first':
        return day === 1; // 1日
      case 'monthly_last':
        return day === daysInMonth; // 最終日
      case 'flexible':
        return true;
      default:
        return false;
    }
  };

  const hasWhiteCellInSection = (
    section: InspectionCategory,
    day: number
  ): boolean => {
    return section.items.some((item) => {
      if (item.frequency === 'flexible') return false;
      return shouldRenderCell(day, item.frequency);
    });
  };

  const renderDisplayRoom = () => {
    switch (displayRoom) {
      case '13番撮影室':
        return (
          <XrayRoom13
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
            hasWhiteCellInSection={hasWhiteCellInSection}
            shouldRenderCell={shouldRenderCell}
            StyledTableCell={StyledTableCell}
            HeaderTableCell={HeaderTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
          />
        );
      case '15番撮影室':
        return (
          <XrayRoom15
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
            hasWhiteCellInSection={hasWhiteCellInSection}
            shouldRenderCell={shouldRenderCell}
            StyledTableCell={StyledTableCell}
            HeaderTableCell={HeaderTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
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
