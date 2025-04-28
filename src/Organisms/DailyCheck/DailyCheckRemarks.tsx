import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

type RemarksProps = {
  StyledTableCell: React.ElementType;
  printRemarksHeight: number;
  daysInMonth: number;
  RemarksContents: string[];
};

const DailyCheckRemarks: FC<RemarksProps> = ({
  StyledTableCell,
  printRemarksHeight,
  daysInMonth,
  RemarksContents,
}) => {
  return (
    <>
      <TableRow>
        <StyledTableCell
          rowSpan={1}
          sx={{
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            backgroundColor: '#f0f0f0',
            border: '3px solid black',
            height: `${printRemarksHeight}mm`,
            // height: '90px',
          }}
        >
          <Typography sx={{ fontWeight: '700' }}>備考</Typography>
        </StyledTableCell>

        <TableCell
          colSpan={2 + daysInMonth}
          sx={{
            border: '3px solid black',
            textAlign: 'left',
            alignItems: 'end',
            // justifyContent: 'end',
            height: 'auto',
            boxSizing: 'border-box',
            verticalAlign: 'bottom',
            px: 1,
            py: '4px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: '100%',
            }}
          >
            {RemarksContents.map((remarksContent, index) => (
              <Typography
                key={index}
                sx={{ fontWeight: '500', fontSize: '9px' }}
              >
                {remarksContent}
              </Typography>
            ))}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DailyCheckRemarks;
