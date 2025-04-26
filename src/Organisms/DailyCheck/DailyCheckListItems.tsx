import React, { FC } from 'react';
import { DeviceInspection, InspectionCategory } from '../../types/types';
import { TableRow, Typography } from '@mui/material';
import { getHolidaysOf } from 'japanese-holidays';

type ListItemsProps = {
  inspectionData: DeviceInspection;
  StyledTableCell: React.ElementType;
  checkItemHight: number;
  dailyChecklistYear: number;
  dailyChecklistMonth: number;
  daysInMonth: number;
  getDayInfo: (
    year: number,
    month: number,
    day: number
  ) => {
    label: number;
    weekday: string;
    dayOfWeek: number;
  };
};

const DailyCheckListItems: FC<ListItemsProps> = ({
  inspectionData,
  StyledTableCell,
  checkItemHight,
  dailyChecklistYear,
  dailyChecklistMonth,
  daysInMonth,
  getDayInfo,
}) => {
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
  console.log(totalHolidays);

  // 指定月の最初の平日を取得
  const getFirstWeekdayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const currentFirstday = firstDay;
    while (
      currentFirstday.getDay() === 0 ||
      currentFirstday.getDay() === 6 ||
      totalHolidays.includes(formatDate(year, month, currentFirstday.getDate()))
    ) {
      currentFirstday.setDate(currentFirstday.getDate() + 1);
    }
    return currentFirstday.getDate();
  };
  // console.log(getFirstWeekdayOfMonth(dailyChecklistYear, dailyChecklistMonth));

  // 指定月の最後の平日を取得
  const getLastWeekdayOfMonth = (year: number, month: number) => {
    const LastDay = new Date(year, month - 1 + 1, 0);
    const currentLastday = LastDay;
    while (
      currentLastday.getDay() === 0 ||
      currentLastday.getDay() === 6 ||
      totalHolidays.includes(formatDate(year, month, currentLastday.getDate()))
    ) {
      currentLastday.setDate(currentLastday.getDate() - 1);
    }
    return currentLastday.getDate();
  };
  // console.log(getLastWeekdayOfMonth(dailyChecklistYear, dailyChecklistMonth));

  // 指定週の最初の平日を取得
  const getFirstWeekdayOfWeek = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const diffToMonday = 1 - dayOfWeek; // 月曜日 : dayOfWeek = 1
    date.setDate(date.getDate() + diffToMonday);
    if (date.getMonth() !== month - 1) {
      return null;
    }
    while (
      totalHolidays.includes(
        formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      )
    ) {
      date.setDate(date.getDate() + 1);
    }
    return date.getDate();
  };

  // 指定週の最後の平日を取得
  const getLastWeekdayOfWeek = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const diffToFriday = 5 - dayOfWeek; // 金曜日 : dayOfWeek = 5
    date.setDate(date.getDate() + diffToFriday);
    if (date.getMonth() !== month - 1) {
      return null;
    }
    while (
      totalHolidays.includes(
        formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      )
    ) {
      date.setDate(date.getDate() - 1);
    }
    return date.getDate();
  };

  // 指定週の水曜日(orその前日)を取得
  const getEveryWednesdayOfWeek = (
    year: number,
    month: number,
    day: number
  ) => {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const diffToWednesday = 3 - dayOfWeek; // 水曜日 : dayOfWeek = 3
    date.setDate(date.getDate() + diffToWednesday);
    if (date.getMonth() !== month - 1) {
      return null;
    }
    while (
      totalHolidays.includes(
        formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      )
    ) {
      date.setDate(date.getDate() - 1);
    }
    return date.getDate();
  };

  // 同一日の同一セクションに、白背景の有無を判定
  const hasWhiteCellInSection = (
    section: InspectionCategory,
    day: number
  ): boolean => {
    return section.items.some((item) => {
      if (item.frequency === 'flexible') return false;
      return shouldRenderCell(day, item.frequency);
    });
  };
  // frequency毎の背景色指定
  const FirstWeekdayOfMonth = getFirstWeekdayOfMonth(
    dailyChecklistYear,
    dailyChecklistMonth
  );
  const LastWeekdayOfMonth = getLastWeekdayOfMonth(
    dailyChecklistYear,
    dailyChecklistMonth
  );
  const shouldRenderCell = (day: number, frequency: string): boolean => {
    const FirstWeekdayOfWeek = getFirstWeekdayOfWeek(
      dailyChecklistYear,
      dailyChecklistMonth,
      day
    );
    const LastWeekdayOfWeek = getLastWeekdayOfWeek(
      dailyChecklistYear,
      dailyChecklistMonth,
      day
    );
    const EveryWednesdayOfWeek = getEveryWednesdayOfWeek(
      dailyChecklistYear,
      dailyChecklistMonth,
      day
    );
    switch (frequency) {
      case 'daily_weekdays':
        return true;
      case 'first-WeekdayOfWeek':
        return day === FirstWeekdayOfWeek; // 週の最初の平日
      case 'last-WeekdayOfWeek':
        return day === LastWeekdayOfWeek; // 週の最後の平日
      case 'every-Wednesday':
        return day === EveryWednesdayOfWeek; // 毎週水曜(orその前日)
      case 'monthly_first':
        return day === FirstWeekdayOfMonth; // 月の最初の平日
      case 'monthly_last':
        return day === LastWeekdayOfMonth; // 月の最後の平日
      case 'flexible':
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      {inspectionData.inspections.map((section, sectionIndex) => {
        return section.items.map((item, itemIndex) => {
          const isFirst = itemIndex === 0;
          return (
            <TableRow key={`${sectionIndex}-${itemIndex}`}>
              {isFirst && (
                <StyledTableCell
                  rowSpan={section.items.length}
                  sx={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    fontWeight: 'bold',
                    backgroundColor: '#f0f0f0',
                    border: '3px solid black',
                    width: '40px',
                  }}
                >
                  {section.category.map((category, categoryIndex) => (
                    <Typography key={categoryIndex} sx={{ fontWeight: '700' }}>
                      {category}
                    </Typography>
                  ))}
                </StyledTableCell>
              )}

              <StyledTableCell
                sx={{
                  borderRight: '3px solid black',
                  borderTop:
                    itemIndex === 0 ? '3px solid black' : '1px solid black',
                  width: '25%',
                  height: `${checkItemHight}mm`,
                  textAlign:
                    item.label !== '実施者サイン' &&
                    item.label !== '画質確認者サイン'
                      ? 'left'
                      : 'right',
                  px: 2,
                }}
              >
                <Typography sx={{ fontWeight: '500' }}>{item.label}</Typography>
              </StyledTableCell>
              {[...Array(daysInMonth)].map((_, dayIndex) => {
                const dayInfo = getDayInfo(
                  dailyChecklistYear,
                  dailyChecklistMonth,
                  dayIndex + 1
                );
                return (
                  dayInfo.weekday !== '日' && //日を除外
                  dayInfo.weekday !== '土' && //土を除外
                  (totalHolidays.includes(
                    formatDate(
                      dailyChecklistYear,
                      dailyChecklistMonth,
                      dayIndex + 1
                    )
                  ) ? (
                    // 祝日の場合
                    <StyledTableCell
                      key={dayIndex}
                      sx={{
                        height: `${checkItemHight}mm`,
                        borderTop:
                          itemIndex === 0
                            ? '3px solid black'
                            : '1px solid black',
                        backgroundColor: 'lightBlue',
                        borderRight:
                          dayInfo.weekday === '金' ||
                          dayIndex + 1 === daysInMonth
                            ? '3px solid black'
                            : '1px solid black',
                      }}
                    >
                      &nbsp;
                    </StyledTableCell>
                  ) : (
                    // 平日の場合
                    <StyledTableCell
                      key={dayIndex}
                      sx={{
                        height: `${checkItemHight}mm`,
                        borderTop:
                          itemIndex === 0
                            ? '3px solid black'
                            : '1px solid black',
                        backgroundColor:
                          item.frequency === 'flexible'
                            ? hasWhiteCellInSection(section, dayIndex + 1)
                              ? 'white'
                              : 'lightblue'
                            : shouldRenderCell(dayIndex + 1, item.frequency)
                            ? 'white'
                            : 'lightblue',
                        borderRight:
                          dayInfo.weekday === '金' ||
                          dayIndex + 1 === daysInMonth
                            ? '3px solid black'
                            : '1px solid black',
                      }}
                    >
                      &nbsp;
                    </StyledTableCell>
                  ))
                );
              })}
            </TableRow>
          );
        });
      })}
    </>
  );
};

export default DailyCheckListItems;
