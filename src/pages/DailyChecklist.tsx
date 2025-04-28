import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { getHolidaysOf } from 'japanese-holidays';
import { Box, styled, TableCell } from '@mui/material';
import DailyCheckYearMonthRoomButton from '../Organisms/DailyCheck/DailyCheckYearMonthButton';
import XrayRoom13 from '../templates/daily-checklist/XrayRoom13';
import XrayRoom15 from '../templates/daily-checklist/XrayRoom15';
import XrayRoom16 from '../templates/daily-checklist/XrayRoom16';
import XrayRoom17 from '../templates/daily-checklist/XrayRoom17';
import XrayRoom19 from '../templates/daily-checklist/XrayRoom19';
import XrayRoom51A from '../templates/daily-checklist/XrayRoom51A';
import XrayRoom12 from '../templates/daily-checklist/XrayRoom12';
import Mammo_N4 from '../templates/daily-checklist/Mammo_N4';
import Mammo_C1 from '../templates/daily-checklist/Mammo_C1';
import Portable51A_DailyInspection from '../templates/daily-checklist/Portable51A_DailyInspection';
import Portable51A_ImageQualityAssessment from '../templates/daily-checklist/Portable51A_ImageQualityAssessment';
import XrayEmergencyRoom from '../templates/daily-checklist/XrayEmergencyRoom';
import PortableEmergencyRoom from '../templates/daily-checklist/PortableEmergencyRoom';
import SuppliesEmergencyRoom from '../templates/daily-checklist/SuppliesEmergencyRoom';
import DEXARoom from '../templates/daily-checklist/DEXARoom';
import PortableOpeRoom from '../templates/daily-checklist/PortableOpeRoom';
import PortableICU from '../templates/daily-checklist/PortableICU';
import PortableChargeCheckSpecial from '../templates/daily-checklist/PortableChargeCheckSpecial';
import DailyCheckPrintButton from '../Organisms/DailyCheck/DailyCheckPrintButton';

const DailyChecklist = () => {
  const [dailyChecklistYear, setDailyChecklistYear] =
    React.useState<number>(2025);
  const [dailyChecklistMonth, setDailyChecklistMonth] =
    React.useState<number>(1);
  const [displayRoom, setDisplayRoom] = useState<string>(
    'ポータブル装置 充電確認 (手術室・ICU)'
  );

  const formatDate = (year: number, month: number, date: number) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(
      2,
      '0'
    )}`;
  };

  // 病院独自の休日を指定
  const getCustomHolidays = (year: number): string[] => {
    const customHolidays = [
      { date: formatDate(year, 1, 2), name: '病院の休日？？' },
      { date: formatDate(year, 1, 3), name: '病院の休日？？' },
      { date: formatDate(year, 12, 29), name: '病院の休日？？' },
      { date: formatDate(year, 12, 30), name: '病院の休日？?？' },
      { date: formatDate(year, 12, 31), name: '病院の休日？?？?' },
    ];
    return customHolidays.map((holiday) => holiday.date);
  };
  // console.log(getCustomHolidays(dailyChecklistYear));

  // 日本の祝日を取得
  interface Holiday {
    month: number;
    date: number;
    name: string;
  }
  const getJapaneseHolidays = (year: number): string[] => {
    // エラー解消方法が不明、試行錯誤済み
    const holidays: Holiday[] = getHolidaysOf(year); // 型を合わせる
    // console.log(holidays);
    const japaneseHolidays = holidays.map((holiday) => {
      return formatDate(year, holiday.month, holiday.date);
      //   const month = holiday.month.toString().padStart(2, '0');
      //   const date = holiday.date.toString().padStart(2, '0');
      //   return [`${year}-${month}-${date}`];
    });
    return japaneseHolidays;
  };
  // console.log(getJapaneseHolidays(2025));

  // 日本の祝日と、病院独自の休日を合わせる
  const totalHolidays = [
    ...getCustomHolidays(dailyChecklistYear),
    ...getJapaneseHolidays(dailyChecklistYear),
  ];
  //   console.log(totalHolidays);

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
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
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
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '16番撮影室':
        return (
          <XrayRoom16
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '17番撮影室':
        return (
          <XrayRoom17
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '19番撮影室':
        return (
          <XrayRoom19
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '操作廊下 (51A)':
        return (
          <XrayRoom51A
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'IP室 (12番撮影室)':
        return (
          <XrayRoom12
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'マンモグラフィー室 (予防医学センター)':
        return (
          <Mammo_N4
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'マンモグラフィー室 (6番撮影室)':
        return (
          <Mammo_C1
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'ポータブル装置 (51A) - 日常点検':
        return (
          <Portable51A_DailyInspection
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'ポータブル装置 (51A) - 画質点検':
        return (
          <Portable51A_ImageQualityAssessment
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '救急外来撮影室':
        return (
          <XrayEmergencyRoom
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'ポータブル装置 (ER)':
        return (
          <PortableEmergencyRoom
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '救急外来撮影室物品':
        return (
          <SuppliesEmergencyRoom
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case '骨密度検査室':
        return (
          <DEXARoom
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'ポータブル装置 (手術室)':
        return (
          <PortableOpeRoom
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'ポータブル装置 (ICU)':
        return (
          <PortableICU
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
            StyledTableCell={StyledTableCell}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
            daysInMonth={daysInMonth}
            getDayInfo={getDayInfo}
          />
        );
      case 'ポータブル装置 充電確認 (手術室・ICU)':
        return (
          <PortableChargeCheckSpecial
            formatDate={formatDate}
            totalHolidays={totalHolidays}
            displayRoom={displayRoom}
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
        <DailyCheckYearMonthRoomButton
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
