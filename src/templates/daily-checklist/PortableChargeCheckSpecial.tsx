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
import DailyCheckDateRowSpecialAll from '../../Organisms/DailyCheck/DailyCheckDateRowSpecialAll'; // special 土日を含めた全日にちを含める・
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckListItemsSpecialAll from '../../Organisms/DailyCheck/DailyCheckListItemsSpecialAll';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionDataOfNightShift: DeviceInspection = {
  //   deviceId: 'PortableChargeCheckSpecial',
  //   deviceName: 'ポータブル装置 充電確認 (手術室・ICU)',
  inspections: [
    {
      category: ['OP室', '(7時半~)'],
      items: [
        { label: '① コンセント', frequency: 'every-day' },
        { label: '② インジケータ', frequency: 'every-day' },
        { label: '実施時間', frequency: 'every-day' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['ICU', '(7時半~)'],
      items: [
        { label: '① コンセント', frequency: 'every-day' },
        { label: '② インジケータ', frequency: 'every-day' },
        { label: '実施時間', frequency: 'every-day' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['朝礼確認'],
      items: [
        {
          label: '夜勤者全員確認',
          frequency: 'daily_weekdays',
        },
        {
          label: '夜勤リーダーサイン',
          frequency: 'flexible',
        },
      ],
    },
    {
      category: ['透析時間', '(7時半~)'],
      items: [
        {
          label: '透析開始時間調査',
          frequency: 'daily_weekdays',
        },
        {
          label: '実施者サイン',
          frequency: 'flexible',
        },
      ],
    },
  ],
};
const inspectionDataOfWeekdayShift: DeviceInspection = {
  //   deviceId: 'PortableChargeCheckSpecial',
  //   deviceName: 'ポータブル装置 充電確認 (手術室・ICU)',
  inspections: [
    {
      category: ['平日日勤者 (撮影部門)'],
      items: [
        {
          label: '確認サイン',
          frequency: 'daily_weekdays',
        },
      ],
    },
  ],
};
const inspectionDataOfHolidayShift: DeviceInspection = {
  //   deviceId: 'PortableChargeCheckSpecial',
  //   deviceName: 'ポータブル装置 充電確認 (手術室・ICU)',
  inspections: [
    {
      category: ['OP室'],
      items: [
        { label: '① コンセント', frequency: 'daily_Holidays' },
        { label: '② インジケータ', frequency: 'daily_Holidays' },
        { label: '実施時間', frequency: 'daily_Holidays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['ICU'],
      items: [
        { label: '① コンセント', frequency: 'daily_Holidays' },
        { label: '② インジケータ', frequency: 'daily_Holidays' },
        { label: '実施時間', frequency: 'daily_Holidays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['51A'],
      items: [
        { label: 'コンセント接続確認', frequency: 'daily_Holidays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
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
// checkItemLengthが今回は3倍(夜勤者・平日日勤者・休日日勤者)があるため、3つ足す。
const checkItemLength: number =
  getCheckItemLength(inspectionDataOfNightShift.inspections) +
  getCheckItemLength(inspectionDataOfWeekdayShift.inspections) +
  getCheckItemLength(inspectionDataOfHolidayShift.inspections);
// console.log(checkItemLength);

const checkItemHight: number = printChecklistHeight / checkItemLength;

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

type PortableChargeCheckSpecialProps = {
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

const PortableChargeCheckSpecial: FC<PortableChargeCheckSpecialProps> = ({
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
              <DailyCheckDateRowSpecialAll
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
                {/* 日常点検項目欄 今回は3つ(夜勤者・平日日勤者・休日日勤者)*/}
                {/* ① 夜勤者(夜勤明け日) */}
                <TableRow>
                  <StyledTableCell
                    rowSpan={13}
                    sx={{
                      writingMode: 'horizontal-tb',
                      textOrientation: 'upright',
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      border: '3px solid black',
                      width: '90px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '700' }}>
                      夜勤者
                      <br />
                      (夜勤明け日)
                    </Typography>
                  </StyledTableCell>
                </TableRow>
                <DailyCheckListItemsSpecialAll
                  formatDate={formatDate}
                  totalHolidays={totalHolidays}
                  inspectionData={inspectionDataOfNightShift}
                  StyledTableCell={StyledTableCell}
                  checkItemHight={checkItemHight}
                  categoryCellWitingMode={'horizontal-tb'}
                  categoryCellWidthPx={'80px'}
                  allCheckCellsWidthPx={800}
                  checkItemFontSize={'10px'}
                  daysInMonth={daysInMonth}
                  dailyChecklistYear={dailyChecklistYear}
                  dailyChecklistMonth={dailyChecklistMonth}
                  getDayInfo={getDayInfo}
                />
                {/* ② 平日日勤者(撮影部門) */}
                {/* <TableRow>
                  <StyledTableCell
                    rowSpan={2}
                    sx={{
                      writingMode: 'horizontal-tb',
                      textOrientation: 'upright',
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      border: '3px solid black',
                      width: '90px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '700' }}>
                      平日日勤者
                      <br />
                      (撮影部門)
                    </Typography>
                  </StyledTableCell>
                </TableRow> */}
                <DailyCheckListItemsSpecialAll
                  formatDate={formatDate}
                  totalHolidays={totalHolidays}
                  inspectionData={inspectionDataOfWeekdayShift}
                  StyledTableCell={StyledTableCell}
                  checkItemHight={checkItemHight}
                  categoryCellWitingMode={'horizontal-tb'}
                  categoryColSpan={2}
                  categoryCellWidthPx={'80px'}
                  allCheckCellsWidthPx={800}
                  checkItemFontSize={'10px'}
                  daysInMonth={daysInMonth}
                  dailyChecklistYear={dailyChecklistYear}
                  dailyChecklistMonth={dailyChecklistMonth}
                  getDayInfo={getDayInfo}
                />
                {/* ③ 休日日勤者 */}
                <TableRow>
                  <StyledTableCell
                    rowSpan={11}
                    sx={{
                      writingMode: 'horizontal-tb',
                      textOrientation: 'upright',
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      border: '3px solid black',
                      width: '90px',
                    }}
                  >
                    <Typography sx={{ fontWeight: '700' }}>
                      休日日勤者
                    </Typography>
                  </StyledTableCell>
                </TableRow>
                <DailyCheckListItemsSpecialAll
                  formatDate={formatDate}
                  totalHolidays={totalHolidays}
                  inspectionData={inspectionDataOfHolidayShift}
                  StyledTableCell={StyledTableCell}
                  checkItemHight={checkItemHight}
                  categoryCellWitingMode={'horizontal-tb'}
                  categoryCellWidthPx={'80px'}
                  allCheckCellsWidthPx={800}
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

export default PortableChargeCheckSpecial;
