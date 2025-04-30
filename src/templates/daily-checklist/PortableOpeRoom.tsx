import { FC } from 'react';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import { DeviceInspection } from '../../types/types';
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckDateRow from '../../Organisms/DailyCheck/DailyCheckDateRow';
import DailyCheckListItems from '../../Organisms/DailyCheck/DailyCheckListItems';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionData: DeviceInspection = {
  //   deviceId: 'PortableOpeRoom',
  //   deviceName: 'ポータブル装置 (手術室)',
  inspections: [
    {
      category: ['Mobile DaRt 手術室'],
      items: [
        { label: 'コンソールの再起動', frequency: 'daily_weekdays' },
        {
          label: '物品確認 \u00A0\u00A0\u00A0\u00A0 フィルムマーク',
          frequency: 'daily_weekdays',
        },
        {
          label: '物品確認 \u00A0\u00A0\u00A0\u00A0 ビニール・メモ用紙',
          frequency: 'daily_weekdays',
        },
        { label: 'ポータブル清掃', frequency: 'daily_weekdays' },
        {
          label: 'バッテリーが規定の位置にあるか',
          frequency: 'daily_weekdays',
        },
        {
          label: '電源プラグの接続確認',
          frequency: 'daily_weekdays',
        },
        { label: '画質確認 (毎週月曜日)', frequency: 'first-WeekdayOfWeek' },
        {
          label: '画質評価をSynapseDicomSCPへ送信',
          frequency: 'first-WeekdayOfWeek',
        },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['手術室 コンソール'],
      items: [
        { label: 'コンソールの再起動', frequency: 'every-Thursday' },
        {
          label: '読み取り装置(XL-2)の再起動',
          frequency: 'every-Thursday',
        },
        {
          label: 'プリンター(DRYPIX)の再起動',
          frequency: 'every-Thursday',
        },
        { label: '実施者サイン', frequency: 'flexible' },
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
const finalRevision: string = '2025/05/01';

// maxWidth: '297mm',
// maxHeight: '210mm',
// printのmargin上下左右 5mmずつ + α余分に
// JavaScript上でミリとピクセルを統一(例：1mm ≒ 3.78px)
// const mmToPx = (mm: number) => mm * 3.78;
const printHeightMM: number = 210 - 10;
const printWidthMM: number = 297 - 10;

const printHeaderHeight: number = printHeightMM * 0.08;
const printDateHeight: number = printHeightMM * 0.04;
const printRemarksHeight: number = printHeightMM * 0.3; //  0.1から0.3へ変更
const printFooterHeight: number = printHeightMM * 0.03;
const printChecklistHeight: number =
  printHeightMM -
  printHeaderHeight -
  printDateHeight -
  printRemarksHeight -
  printFooterHeight;

const checkItemLength: number =
  inspectionData.inspections[0].items.length +
  inspectionData.inspections[1].items.length;
//   inspectionData.inspections[2].items.length;

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

type PortableOpeRoomProps = {
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

const PortableOpeRoom: FC<PortableOpeRoomProps> = ({
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
          width: `${printWidthMM}mm`,
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
                getDayInfo={getDayInfo}
              />
              <TableBody>
                {/* 日常点検項目欄 */}
                <DailyCheckListItems
                  formatDate={formatDate}
                  totalHolidays={totalHolidays}
                  inspectionData={inspectionData}
                  StyledTableCell={StyledTableCell}
                  checkItemHight={checkItemHight}
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

export default PortableOpeRoom;
