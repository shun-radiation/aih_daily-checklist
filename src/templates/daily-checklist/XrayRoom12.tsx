import { FC } from 'react';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import { DeviceInspection } from '../../types/types';
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckDateRow from '../../Organisms/DailyCheck/DailyCheckDateRow';
import DailyCheckListItems from '../../Organisms/DailyCheck/DailyCheckListItems';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionData: DeviceInspection = {
  deviceId: '12-room',
  deviceName: 'IP室 (12番撮影室)',
  inspections: [
    {
      category: ['始業点検'],
      items: [
        { label: '電源投入後、表示灯の確認', frequency: 'daily_weekdays' },
        { label: '異音・異臭の有無', frequency: 'daily_weekdays' },
        { label: '検査室の温度確認 (23度)', frequency: 'daily_weekdays' },
        { label: '検査室の湿度確認 (20~55%)', frequency: 'daily_weekdays' },
        { label: 'システムの起動確認', frequency: 'daily_weekdays' },
        { label: 'X線管球ウォームアップ', frequency: 'daily_weekdays' },
        { label: '透視画像の確認 (17inch)', frequency: 'daily_weekdays' },
        { label: '撮影画像の確認 (17inch)', frequency: 'daily_weekdays' },
        { label: '撮影間電圧 [kV] (17inch)', frequency: 'daily_weekdays' },
        { label: '撮影間時間 [msec] (17inch)', frequency: 'daily_weekdays' },
        { label: '可動絞りの動作確認', frequency: 'daily_weekdays' },
        { label: '照射野ランプの点灯確認', frequency: 'daily_weekdays' },
        {
          label: '踏台・握り棒の固定確認？？？',
          frequency: 'daily_weekdays',
        },
        { label: '寝台・圧迫筒の動作確認', frequency: 'daily_weekdays' },
        { label: 'マイク・スピーカーの動作確認', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['終業点検'],
      items: [
        { label: '撮影室の整理・整頓', frequency: 'daily_weekdays' },
        { label: '撮影台・備品の清掃', frequency: 'daily_weekdays' },
        { label: '補助具・備品の紛失 チェック', frequency: 'daily_weekdays' },
        {
          label: 'エアコンの温度を23度に設定',
          frequency: 'daily_weekdays',
        },
        { label: '検査室の温度確認 (23度)', frequency: 'daily_weekdays' },
        { label: '医診伝心での画像確認', frequency: 'daily_weekdays' },
        { label: '★ スロット撮影画像の保護確認', frequency: 'daily_weekdays' },
        {
          label: '尿受けの数量確認 (残り10個で注文)',
          frequency: 'daily_weekdays',
        },
        { label: '施錠の札を正しい面に変える', frequency: 'daily_weekdays' },
        { label: 'システムの終了確認', frequency: 'daily_weekdays' },
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
          label: 'ハードディスクの残り容量の確認',
          frequency: 'last-WeekdayOfWeek',
        },
        // {
        //   label: '手指消毒液○の残量確認 (月初) ※',
        //   frequency: 'monthly_first',
        // },
        { label: '時計の時間合わせ (月末)', frequency: 'monthly_last' },
        {
          label: '★ Dr.の水晶体線量計の交換 (月末)',
          frequency: 'monthly_last',
        },
        {
          label: '★ FPDキャリブレーション (1,4,7,10月末) ※',
          frequency: 'quarterly',
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

const RemarksContents = [
  //   '※ 手指消毒液の残量・使用本数は感染管理委員会のExcelファイルに記入。',
  '※ FPDキャリブレーションはメッセージが出た週の金曜日に上位技師とともに行う。',
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

type XrayRoom12Props = {
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

const XrayRoom12: FC<XrayRoom12Props> = ({
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
                  daysInMonth={daysInMonth}
                  dailyChecklistYear={dailyChecklistYear}
                  dailyChecklistMonth={dailyChecklistMonth}
                  getDayInfo={getDayInfo}
                />
                {/* ======================================================================= */}
                {/* 備考欄 */}
                <DailyCheckRemarks
                  StyledTableCell={StyledTableCell}
                  printRemarksHeight={21} //  21mmに変更
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

export default XrayRoom12;
