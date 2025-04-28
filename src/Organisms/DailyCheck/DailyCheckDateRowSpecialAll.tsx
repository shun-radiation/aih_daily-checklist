import { TableHead, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

type AllDateRowProps = {
  formatDate: (year: number, month: number, date: number) => string;
  totalHolidays: string[];
  StyledTableCell: React.ElementType;
  printDateHeight: number;
  daysInMonth: number;
  dailyChecklistYear: number;
  dailyChecklistMonth: number;
  itemsHeaderColSpan?: number;
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

const DailyCheckDateRowSpecialAll: FC<AllDateRowProps> = ({
  formatDate,
  totalHolidays,
  StyledTableCell,
  printDateHeight,
  daysInMonth,
  dailyChecklistYear,
  dailyChecklistMonth,
  itemsHeaderColSpan = 2,
  getDayInfo,
}) => {
  return (
    <TableHead
      sx={{
        border: '3px solid black',
        height: `${printDateHeight}mm`,
        boxSizing: 'border-box',
      }}
    >
      <TableRow>
        <StyledTableCell
          sx={{
            border: '3px solid black',
            boxSizing: 'border-box',
            fontWeight: 'bold',
          }}
          colSpan={itemsHeaderColSpan} // デフォルト：{2}
        >
          <Typography sx={{ fontWeight: '500' }}>点検項目</Typography>
        </StyledTableCell>
        {[...Array(daysInMonth)].map((_, i) => {
          const dayInfo = getDayInfo(
            dailyChecklistYear,
            dailyChecklistMonth,
            i + 1
          );
          return (
            <StyledTableCell
              key={i}
              sx={{
                lineHeight: '1.2',
                borderRight:
                  dayInfo.weekday === '日'
                    ? '3px solid black'
                    : '1px solid black',
                color:
                  dayInfo.weekday === '土'
                    ? 'blue'
                    : dayInfo.weekday === '日' ||
                      totalHolidays.includes(
                        formatDate(
                          dailyChecklistYear,
                          dailyChecklistMonth,
                          i + 1
                        )
                      )
                    ? 'red'
                    : 'black',
              }}
            >
              {dayInfo.label}
              <br />
              {dayInfo.weekday}
            </StyledTableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default DailyCheckDateRowSpecialAll;
