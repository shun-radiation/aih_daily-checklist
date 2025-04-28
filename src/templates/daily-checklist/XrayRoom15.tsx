import { FC } from 'react';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import { DeviceInspection } from '../../types/types';
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckDateRow from '../../Organisms/DailyCheck/DailyCheckDateRow';
import DailyCheckListItems from '../../Organisms/DailyCheck/DailyCheckListItems';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionData: DeviceInspection = {
  deviceId: '15-room',
  deviceName: '15番撮影室',
  inspections: [
    {
      category: ['始業点検'],
      items: [
        { label: '電源投入後、表示灯の確認', frequency: 'daily_weekdays' },
        { label: '異音・異臭の有無', frequency: 'daily_weekdays' },
        { label: '1管球エージング (90-140kV)', frequency: 'daily_weekdays' },
        { label: '2管球エージング (70-100kV)', frequency: 'daily_weekdays' },
        { label: 'X線管保持装置の動作確認', frequency: 'daily_weekdays' },
        { label: '立位リーダーとのアライメント', frequency: 'daily_weekdays' },
        { label: '臥位テーブルとのアライメント', frequency: 'daily_weekdays' },
        { label: '可動絞りの動作確認', frequency: 'daily_weekdays' },
        { label: '照射野ランプの点灯確認', frequency: 'daily_weekdays' },
        { label: '立位・臥位撮影台の動作確認', frequency: 'daily_weekdays' },
        { label: '立位・臥位パネルの起動確認', frequency: 'daily_weekdays' },
        { label: '画質確認(CR)', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
        { label: '画質確認者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['終業点検'],
      items: [
        { label: '撮影室の整理・整頓', frequency: 'daily_weekdays' },
        { label: '撮影台・備品の清掃', frequency: 'daily_weekdays' },
        {
          label: 'カセッテ(IP)の清掃',
          frequency: 'daily_weekdays',
        },
        { label: '補助具・備品の紛失 チェック', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['月間点検', '週間点検'],
      items: [
        { label: '撮影室の清掃', frequency: 'last-WeekdayOfWeek' },
        { label: '寝具・衣類の交換', frequency: 'last-WeekdayOfWeek' },
        {
          label: 'コンソールモニター及び周辺の清掃',
          frequency: 'last-WeekdayOfWeek',
        },
        {
          label: '手指消毒液⑦の残量確認 (月初) ※',
          frequency: 'monthly_first',
        },
        { label: '時計の時間合わせ (月末)', frequency: 'monthly_last' },
        {
          label: '実施者サイン',
          frequency: 'flexible',
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
  '※ 手指消毒液の残量・使用本数は感染管理委員会のExcelファイルに記入。',
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

const checkItemLength: number =
  inspectionData.inspections[0].items.length +
  inspectionData.inspections[1].items.length +
  inspectionData.inspections[2].items.length;

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

type XrayRoom15Props = {
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

const XrayRoom15: FC<XrayRoom15Props> = ({
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

export default XrayRoom15;
