import React, { FC } from 'react';
import { DeviceInspection, InspectionCategory } from '../../types/types';
import { Box, TableRow, Typography } from '@mui/material';

type ListItemsProps = {
  formatDate: (year: number, month: number, date: number) => string;
  totalHolidays: string[];
  inspectionData: DeviceInspection;
  StyledTableCell: React.ElementType;
  checkItemHight: number;
  categoryCellWidthPx?: string;
  categoryCellWitingMode?: string;
  labelTextAlign?: string;
  allCheckCellsWidthPx?: number;
  checkItemFontSize?: string;
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
  formatDate,
  totalHolidays,
  inspectionData,
  StyledTableCell,
  checkItemHight,
  categoryCellWidthPx = '45px',
  categoryCellWitingMode = 'vertical-rl',
  labelTextAlign,
  allCheckCellsWidthPx = 800,
  checkItemFontSize,
  dailyChecklistYear,
  dailyChecklistMonth,
  daysInMonth,
  getDayInfo,
}) => {
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

  // 3ヶ月に1回の最後の平日を取得(1,4,7,10月)
  const getQuarterlyLastWeekdayOfMonth = (year: number, month: number) => {
    if (month === 1 || month === 4 || month === 7 || month === 10) {
      return getLastWeekdayOfMonth(year, month);
    } else {
      return null;
    }
  };

  // 2,8月の最後の平日を取得(2,8月)
  const getLastWeekdayOfFebAndAug = (year: number, month: number) => {
    if (month === 2 || month === 8) {
      return getLastWeekdayOfMonth(year, month);
    } else {
      return null;
    }
  };

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
    let i = 0;
    while (
      totalHolidays.includes(
        formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      )
    ) {
      date.setDate(date.getDate() - 1);
      i += 1;
      // console.log(i, date.getDay());
      // 水➡︎火➡︎月➡︎日のように3回 date.setDate(date.getDate() - 1);を実行してしまうと、その週の実施日が存在しなくなるため、
      // 逆に date.setDate(date.getDate() + 1); していくことで、木、金の実施日を探す。
      if (i >= 2) {
        while (
          totalHolidays.includes(
            formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
          )
        ) {
          date.setDate(date.getDate() + 1);
        }
      }
    }
    return date.getDate();
  };

  // 指定週の木曜日(orその前日)を取得
  const getEveryThursdayOfWeek = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const diffToWednesday = 4 - dayOfWeek; // 木曜日 : dayOfWeek = 4
    date.setDate(date.getDate() + diffToWednesday);
    if (date.getMonth() !== month - 1) {
      return null;
    }
    let i = 0;
    while (
      totalHolidays.includes(
        formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      )
    ) {
      date.setDate(date.getDate() - 1);
      i += 1;
      // 木➡︎水➡︎火➡︎月➡︎日のように4回 date.setDate(date.getDate() - 1);を実行してしまうと、その週の実施日が存在しなくなるため、
      // 逆に date.setDate(date.getDate() + 1); していくことで、金の実施日を探す。
      if (i >= 3) {
        while (
          totalHolidays.includes(
            formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
          )
        ) {
          date.setDate(date.getDate() + 1);
        }
      }
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
  const QuarterlyLastWeekdayOfMonth = getQuarterlyLastWeekdayOfMonth(
    dailyChecklistYear,
    dailyChecklistMonth
  );
  const LastWeekdayOfFebAndAug = getLastWeekdayOfFebAndAug(
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
    const EveryThursdayOfWeek = getEveryThursdayOfWeek(
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
      case 'every-Thursday':
        return day === EveryThursdayOfWeek; // 毎週木曜(orその前日)
      case 'monthly_first':
        return day === FirstWeekdayOfMonth; // 月の最初の平日
      case 'monthly_last':
        return day === LastWeekdayOfMonth; // 月の最後の平日
      case 'quarterly':
        return day === QuarterlyLastWeekdayOfMonth; // 3ヶ月に1回の最後の平日(1,4,7,10月)
      case 'feb_and_aug':
        return day === LastWeekdayOfFebAndAug; // 3ヶ月に1回の最後の平日(1,4,7,10月)
      case 'flexible':
        return true;
      default:
        return false;
    }
  };

  // weekdayの日数(月の土日を除く日数)をカウントし、幅を800pxとして1セルあたりのpx数(切り捨て)を変数に代入する。
  // allCheckCellsWidthPxの初期値は800とする。
  const weekdayCellCount: number = [...Array(daysInMonth)].filter(
    (_, dayIndex) => {
      const dayInfo = getDayInfo(
        dailyChecklistYear,
        dailyChecklistMonth,
        dayIndex + 1
      );
      return dayInfo.weekday !== '土' && dayInfo.weekday !== '日';
    }
  ).length;
  const checkCellWidthPx: number = Math.trunc(
    allCheckCellsWidthPx / weekdayCellCount
  );
  // console.log(checkCellWidthPx);

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
                    writingMode: categoryCellWitingMode, // デフォルト：'vertical-rl'
                    textOrientation: 'upright',
                    fontWeight: 'bold',
                    backgroundColor: '#f0f0f0',
                    border: '3px solid black',
                    width: categoryCellWidthPx, // デフォルト：'45px'
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
                  // width: '250px',
                  height: `${checkItemHight}mm`,
                  textAlign: !labelTextAlign
                    ? // デフォルトの配置
                      item.label !== '実施者サイン' &&
                      item.label !== '画質確認者サイン'
                      ? 'left'
                      : 'right'
                    : // 指定したい時の配置
                      labelTextAlign,
                  px: '10px',
                }}
              >
                {Array.isArray(item.label) ? (
                  // item.labelが配列である場合
                  <Typography
                    sx={{
                      fontWeight: '400',
                      fontSize: checkItemFontSize,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    {item.label.map((label, labelIndex) => (
                      <Box key={labelIndex} component='span'>
                        {label}
                      </Box>
                    ))}
                  </Typography>
                ) : (
                  // item.labelが配列ではない場合
                  <Typography
                    sx={{
                      fontWeight: '400',
                      fontSize: checkItemFontSize,
                    }}
                  >
                    {item.label}
                  </Typography>
                )}
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
                        width: `${checkCellWidthPx}px`,
                        borderTop:
                          itemIndex === 0
                            ? '3px solid black'
                            : '1px solid black',
                        boxSizing: 'border-box',
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
                        width: `${checkCellWidthPx}px`,
                        borderTop:
                          itemIndex === 0
                            ? '3px solid black'
                            : '1px solid black',
                        boxSizing: 'border-box',
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
