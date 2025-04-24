import { TableHead, TableRow } from '@mui/material';
import { FC } from 'react';

type DateRowProps = {
  StyledTableCell: React.ElementType;
  HeaderTableCell: React.ElementType;
  printDateHeight: number;
  daysInMonth: number;
  dailyChecklistYear: number;
  dailyChecklistMonth: number;
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

const DailyCheckDateRow: FC<DateRowProps> = ({
  StyledTableCell,
  HeaderTableCell,
  printDateHeight,
  daysInMonth,
  dailyChecklistYear,
  dailyChecklistMonth,
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
        <HeaderTableCell
          sx={{ border: '3px solid black', boxSizing: 'border-box' }}
          colSpan={2}
        >
          点検項目
        </HeaderTableCell>
        {[...Array(daysInMonth)].map((_, i) => {
          const dayInfo = getDayInfo(
            dailyChecklistYear,
            dailyChecklistMonth,
            i + 1
          );
          return (
            dayInfo.weekday !== '日' &&
            dayInfo.weekday !== '土' && (
              <StyledTableCell
                key={i}
                sx={{
                  lineHeight: '1.2',
                  borderRight:
                    dayInfo.weekday === '金'
                      ? '3px solid black'
                      : '1px solid black',
                }}
              >
                {dayInfo.label}
                <br />
                {dayInfo.weekday}
              </StyledTableCell>
            )
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default DailyCheckDateRow;
