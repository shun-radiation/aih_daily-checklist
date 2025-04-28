import { FC } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Box,
  Typography,
  TableRow,
} from '@mui/material';
import { DeviceInspection, InspectionCategory } from '../../types/types';
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckDateRow from '../../Organisms/DailyCheck/DailyCheckDateRow';
import DailyCheckListItems from '../../Organisms/DailyCheck/DailyCheckListItems';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionData: DeviceInspection = {
  //   deviceId: 'Portable51A_DailyInspection',
  //   deviceName: 'ポータブル装置 (51A) - 日常点検',
  inspections: [
    {
      category: ['Mobile Art (1)'],
      items: [
        {
          label: '動作確認 (移動・ブレーキ・照射野・レディ)',
          frequency: 'daily_weekdays',
        },
        {
          label: '物品確認 (マーク・ビニール・メモ用紙)',
          frequency: 'daily_weekdays',
        },
      ],
    },
    {
      category: ['Mobile Art (3)'],
      items: [
        {
          label: '動作確認 (移動・ブレーキ・照射野・レディ)',
          frequency: 'daily_weekdays',
        },
        {
          label: '物品確認 (マーク・ビニール・メモ用紙)',
          frequency: 'daily_weekdays',
        },
      ],
    },
    {
      category: ['Mobillet (6)'],
      items: [
        {
          label: '動作確認 (移動・ブレーキ・照射野・レディ)',
          frequency: 'daily_weekdays',
        },
        {
          label: '物品確認 (マーク・ビニール・メモ用紙)',
          frequency: 'daily_weekdays',
        },
      ],
    },
    {
      category: ['CALNEO Go (2)'],
      items: [
        {
          label: '動作確認 (移動・ブレーキ・照射野・レディ)',
          frequency: 'daily_weekdays',
        },
        {
          label: '物品確認 (マーク・ビニール・メモ用紙)',
          frequency: 'daily_weekdays',
        },
      ],
    },
    {
      category: ['CALNEO Go (4)'],
      items: [
        {
          label: '動作確認 (移動・ブレーキ・照射野・レディ)',
          frequency: 'daily_weekdays',
        },
        {
          label: '物品確認 (マーク・ビニール・メモ用紙)',
          frequency: 'daily_weekdays',
        },
      ],
    },
    {
      category: ['CALNEO Go (5)'],
      items: [
        {
          label: '動作確認 (移動・ブレーキ・照射野・レディ)',
          frequency: 'daily_weekdays',
        },
        {
          label: '物品確認 (マーク・ビニール・メモ用紙)',
          frequency: 'daily_weekdays',
        },
      ],
    },
    {
      category: [''],
      items: [
        {
          label: '実施者サイン',
          frequency: 'daily_weekdays',
        },
      ],
    },
    // {
    //   category: '備考',
    //   items: [{ label: '', frequency: '' }],
    // },
  ],
};

const RemarksContents = [
  //   '※ 手指消毒液の残量・使用本数は感染管理委員会のExcelファイルに記入。',
  '',
];

// 最終改訂日:yyyy/MM/dd の形式で統一
const finalRevision: string = '2025/01/01';

// maxWidth: '297mm',
// maxHeight: '210mm',
// printのmargin上下左右 5mmずつ + α余分に
// JavaScript上でミリとピクセルを統一(例：1mm ≒ 3.78px)
// const mmToPx = (mm: number) => mm * 3.78;
const printHeightMM: number = 210 - 10;
const printWidthMM: number = 297 - 10;

const printHeaderHeight: number = printHeightMM * 0.08;
const printDateHeight: number = printHeightMM * 0.04;
const printRemarksHeight: number = printHeightMM * 0.1;
const printFooterHeight: number = printHeightMM * 0.03;
const printChecklistHeight: number =
  printHeightMM -
  printHeaderHeight -
  printDateHeight -
  printRemarksHeight -
  printFooterHeight;

const getCheckItemLength = (inspections: InspectionCategory[]) => {
  let itemCount: number = 0;
  inspections.forEach((section) => (itemCount += section.items.length));
  return itemCount;
};
const checkItemLength: number = getCheckItemLength(inspectionData.inspections);
// console.log(checkItemLength);

// checkItemLengthが今回は2倍(始業点検分・終業点検分)があるため、掛ける2をしている
const checkItemHight: number = printChecklistHeight / (checkItemLength * 2);

// const checkItemHight: string = `calc((${printHeight.replace(
//   /^calc\((.*)\)$/,
//   '$1'
// )} - ${printHeaderHight} - ${printDateHight} - ${printRemarksHight} - ${printFooterHight}) / ${checkItemLength})`;

// なんとなく25pxぐらい
// const checkItemMaxHight: string = '25px';

// console.log(checkItemLength);
// console.log('全体', printHeightMM);
// console.log('ヘッダー', printHeaderHeight);
// console.log('日にち', printDateHeight);
// console.log('リスト全体', printChecklistHeight);
// console.log('項目一行', checkItemHight);
// console.log('備考', printRemarksHeight);
// console.log('フッター', printFooterHeight);

type Portable51A_DailyInspectionProps = {
  formatDate: (year: number, month: number, date: number) => string;
  totalHolidays: string[];
  displayRoom: string;
  dailyChecklistYear: number;
  dailyChecklistMonth: number;
  StyledTableCell: React.ElementType;
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

const Portable51A_DailyInspection: FC<Portable51A_DailyInspectionProps> = ({
  formatDate,
  totalHolidays,
  displayRoom,
  dailyChecklistYear,
  dailyChecklistMonth,
  StyledTableCell,
  daysInMonth,
  getDayInfo,
}) => {
  return (
    <>
      <Box
        id='print-area'
        sx={{
          mx: 'auto',
          height: `${printHeightMM}mm`,
          // width: `${printWidthMM}mm`,
          // maxHeight: `${printHeightMM}mm`,
          // maxWidth: `${printWidthMM}mm`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // textAlign: 'center',
          boxSizing: 'border-box',
          // border: '5px solid red',
          // overflow: 'hidden',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            height: `${printHeightMM}mm`,
            width: `${printWidthMM}mm`,
            display: 'block',
            boxSizing: 'border-box',
          }}
        >
          {/* ヘッダー */}
          <DailyCheckHeader
            displayRoom={displayRoom}
            printHeaderHeight={printHeaderHeight}
            dailyChecklistYear={dailyChecklistYear}
            dailyChecklistMonth={dailyChecklistMonth}
          />
          <TableContainer>
            <Table size='small'>
              {/* 日にち */}
              <DailyCheckDateRow
                formatDate={formatDate}
                totalHolidays={totalHolidays}
                StyledTableCell={StyledTableCell}
                printDateHeight={printDateHeight}
                daysInMonth={daysInMonth}
                dailyChecklistYear={dailyChecklistYear}
                dailyChecklistMonth={dailyChecklistMonth}
                itemsHeaderColSpan={3}
                getDayInfo={getDayInfo}
              />
              <TableBody>
                {/* 日常点検項目欄 今回は2つ(始業点検用・終業点検用)*/}
                {/* ①始業点検 */}
                <TableRow>
                  <StyledTableCell
                    rowSpan={checkItemLength + 1}
                    sx={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'upright',
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      border: '3px solid black',
                      width: '45px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '700' }}>始業点検</Typography>
                  </StyledTableCell>
                </TableRow>
                <DailyCheckListItems
                  formatDate={formatDate}
                  totalHolidays={totalHolidays}
                  inspectionData={inspectionData}
                  StyledTableCell={StyledTableCell}
                  checkItemHight={checkItemHight}
                  categoryCellWitingMode={'horizontal-tb'}
                  categoryCellWidthPx={'100px'}
                  allCheckCellsWidthPx={700}
                  checkItemFontSize={'10px'}
                  daysInMonth={daysInMonth}
                  dailyChecklistYear={dailyChecklistYear}
                  dailyChecklistMonth={dailyChecklistMonth}
                  getDayInfo={getDayInfo}
                />
                {/* ②終業点検 */}
                <TableRow>
                  <StyledTableCell
                    rowSpan={checkItemLength + 1}
                    sx={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'upright',
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      border: '3px solid black',
                      width: '45px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '700' }}>終業点検</Typography>
                  </StyledTableCell>
                </TableRow>
                <DailyCheckListItems
                  formatDate={formatDate}
                  totalHolidays={totalHolidays}
                  inspectionData={inspectionData}
                  StyledTableCell={StyledTableCell}
                  checkItemHight={checkItemHight}
                  categoryCellWitingMode={'horizontal-tb'}
                  categoryCellWidthPx={'100px'}
                  allCheckCellsWidthPx={700}
                  checkItemFontSize={'10px'}
                  daysInMonth={daysInMonth}
                  dailyChecklistYear={dailyChecklistYear}
                  dailyChecklistMonth={dailyChecklistMonth}
                  getDayInfo={getDayInfo}
                />
                {/* ======================================================================= */}
                {/* 備考欄 */}
                <DailyCheckRemarks
                  StyledTableCell={StyledTableCell}
                  printRemarksHeight={printRemarksHeight}
                  daysInMonth={daysInMonth}
                  RemarksContents={RemarksContents}
                />
              </TableBody>
            </Table>
          </TableContainer>
          {/* フッター */}
          <DailyCheckFooter
            printFooterHeight={printFooterHeight}
            finalRevision={finalRevision}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Portable51A_DailyInspection;
