import { FC } from 'react';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import { DeviceInspection } from '../../types/types';
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckDateRow from '../../Organisms/DailyCheck/DailyCheckDateRow';
import DailyCheckListItems from '../../Organisms/DailyCheck/DailyCheckListItems';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionData: DeviceInspection = {
  deviceId: 'mammo-N4',
  deviceName: 'マンモグラフィー室 (予防医学センター)',
  inspections: [
    {
      category: ['始業点検'],
      items: [
        { label: '電源投入後、表示灯の確認', frequency: 'daily_weekdays' },
        { label: '異音・異臭の有無', frequency: 'daily_weekdays' },
        { label: 'キャリブレーション', frequency: 'daily_weekdays' },
        {
          label: '保持装置の動作確認 (左右90度も含む)',
          frequency: 'daily_weekdays',
        },
        { label: '圧迫板の動作確認 (自動退避)', frequency: 'daily_weekdays' },
        { label: '照射野ランプの点灯確認', frequency: 'daily_weekdays' },
        { label: '1shotファントム評価', frequency: 'daily_weekdays' },
        { label: '室温の確認 (20~30度)', frequency: 'daily_weekdays' },
        { label: '湿度の確認 (30~75%)', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['終業点検'],
      items: [
        { label: '装置・備品の清掃・整理整頓', frequency: 'daily_weekdays' },
        { label: '備品の紛失 チェック', frequency: 'daily_weekdays' },
        { label: 'データバックアップの確認', frequency: 'daily_weekdays' },
        { label: 'synapse転送の確認', frequency: 'daily_weekdays' },
        { label: '加湿器の注水 (使用時期のみ)', frequency: 'daily_weekdays' },
        { label: '除湿機の注水 (使用時期のみ)', frequency: 'daily_weekdays' },
        { label: '室温の確認 (20~30度)', frequency: 'daily_weekdays' },
        { label: '湿度の確認 (30~75%)', frequency: 'daily_weekdays' },
        { label: 'エアコン起動の確認', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['月間点検', '週間点検'],
      items: [
        {
          label: '156およびｽﾃｯﾌﾟﾌｧﾝﾄﾑ評価 (毎週水曜)',
          frequency: 'every-Wednesday',
        },
        { label: '撮影室の清掃', frequency: 'last-WeekdayOfWeek' },
        { label: '手洗い場の清掃', frequency: 'last-WeekdayOfWeek' },
        {
          label: 'コンソールモニター及び周辺の清掃',
          frequency: 'last-WeekdayOfWeek',
        },
        {
          label: 'コメント用紙のプリント (1週間分)',
          frequency: 'last-WeekdayOfWeek',
        },
        {
          label: 'コメント用紙の整理 (2ヶ月保存)',
          frequency: 'last-WeekdayOfWeek',
        },
        {
          label: '手指消毒液⑬の残量確認 (月初) ※',
          frequency: 'monthly_first',
        },
        {
          label: '加湿器のフィルター清掃 (月末)',
          frequency: 'monthly_last',
        },
        { label: '時計の時間合わせ (月末)', frequency: 'monthly_last' },
        {
          label: 'ハードディスクのデータ削除 (月末)',
          frequency: 'monthly_last',
        },
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

const RemarksContents: string[] = [
  '※ 1shotファントム ➡︎ AEC：Auto , 圧迫厚：45mm で撮影',
  '※ 156ファントム ➡︎ AEC：Auto , 圧迫厚：50mm で撮影',
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
// const printRemarksHeight: number = printHeightMM * 0.1;
const printFooterHeight: number = printHeightMM * 0.03;
// =======================
// const printChecklistHeight: number =
//   printHeightMM -
//   printHeaderHeight -
//   printDateHeight -
//   printRemarksHeight -
//   printFooterHeight;

// const checkItemLength: number =
//   inspectionData.inspections[0].items.length +
//   inspectionData.inspections[1].items.length +
//   inspectionData.inspections[2].items.length;
// const checkItemHight: number = printChecklistHeight / checkItemLength;
// =======================

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

type MammoN4Props = {
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

const Mammo_N4: FC<MammoN4Props> = ({
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
                  //   checkItemHight={checkItemHight}
                  checkItemHight={4} //  4mmに変更
                  checkItemFontSize={'10px'} //  10pxに変更
                  dailyChecklistYear={dailyChecklistYear}
                  dailyChecklistMonth={dailyChecklistMonth}
                  daysInMonth={daysInMonth}
                  getDayInfo={getDayInfo}
                />
                {/* ======================================================================= */}
                {/* 備考欄 */}
                <DailyCheckRemarks
                  StyledTableCell={StyledTableCell}
                  printRemarksHeight={38} //  38mmに変更
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

export default Mammo_N4;
