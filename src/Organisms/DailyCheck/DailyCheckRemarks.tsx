import { TableRow, Typography } from '@mui/material';
import { FC } from 'react';

type RemarksProps = {
  StyledTableCell: React.ElementType;
  printRemarksHeight: number;
  daysInMonth: number;
};

const DailyCheckRemarks: FC<RemarksProps> = ({
  StyledTableCell,
  printRemarksHeight,
  daysInMonth,
}) => {
  return (
    <>
      <TableRow>
        <StyledTableCell
          rowSpan={1}
          sx={{
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            fontWeight: 'bold',
            backgroundColor: '#f0f0f0',
            border: '3px solid black',
            height: `${printRemarksHeight}mm`,
          }}
        >
          備考
        </StyledTableCell>

        <StyledTableCell
          colSpan={2 + daysInMonth}
          sx={{ border: '3px solid black' }}
        >
          <Typography>
            ※手指消毒液の残量・使用本数は感染管理委員会のExcelファイルに記入
          </Typography>
          <Typography>
            ※CBCT検査申込書(6ヶ月保管)ファイルに1ヵ月分の申込書を綴じ、6ヶ月を超えた申込書を廃棄してください。
          </Typography>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

export default DailyCheckRemarks;
