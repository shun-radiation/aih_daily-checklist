import { FC } from 'react';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import { DeviceInspection } from '../../types/types';
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckDateRow from '../../Organisms/DailyCheck/DailyCheckDateRow';
import DailyCheckListItems from '../../Organisms/DailyCheck/DailyCheckListItems';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionData: DeviceInspection = {
  //   deviceId: 'SuppliesEmergencyRoom',
  //   deviceName: '救急外来撮影室物品',
  inspections: [
    {
      category: ['救急外来撮影室物品'],
      items: [
        { label: '1. フィルムマーク', frequency: 'daily_weekdays' },
        { label: '2. テープ・ガムテープ', frequency: 'daily_weekdays' },
        { label: '3. 撮影用発泡スチロール各種', frequency: 'daily_weekdays' },
        { label: '4. ビニール袋 (大・中・小)', frequency: 'daily_weekdays' },
        {
          label: '5. ビニール手袋・酒精綿・ガーゼ',
          frequency: 'daily_weekdays',
        },
        {
          label: '6. ティッシュ・ペーパータオル',
          frequency: 'daily_weekdays',
        },
        { label: '7. 手指消毒剤', frequency: 'daily_weekdays' },
        { label: '8. 無水エタノール', frequency: 'daily_weekdays' },
        { label: '9. 洗浄除菌タオル詰め替え用', frequency: 'daily_weekdays' },
        { label: '10. マジック。メモ用紙など', frequency: 'daily_weekdays' },
        {
          label: '11. ハンドソープ・ハンドクリーム',
          frequency: 'daily_weekdays',
        },
        { label: '12. 検査着', frequency: 'daily_weekdays' },
        { label: '13. ナビガードエプロン', frequency: 'daily_weekdays' },
        { label: '14. 防水シーツ', frequency: 'daily_weekdays' },
        {
          label: '15. サージカルマスク (ゴムタイプ)',
          frequency: 'daily_weekdays',
        },
        {
          label: '16. アイガード',
          frequency: 'daily_weekdays',
        },
        {
          label: '17. N95マスク (10枚以上)',
          frequency: 'daily_weekdays',
        },
        {
          label: '18. ER用メモ用紙 (ER・3CT) 予備2',
          frequency: 'daily_weekdays',
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
  '※ 物品が無くなりそうな場合は補充してください (日勤・夜勤に迷惑がかからないようにしましょう)。',
  '※ N95マスクは10枚以上補充してください。',
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
const printRemarksHeight: number = printHeightMM * 0.3; //  0.1から0.3へ変更
const printFooterHeight: number = printHeightMM * 0.03;
const printChecklistHeight: number =
  printHeightMM -
  printHeaderHeight -
  printDateHeight -
  printRemarksHeight -
  printFooterHeight;

const checkItemLength: number = inspectionData.inspections[0].items.length;
//   inspectionData.inspections[1].items.length;
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

type SuppliesEmergencyRoomProps = {
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

const SuppliesEmergencyRoom: FC<SuppliesEmergencyRoomProps> = ({
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

export default SuppliesEmergencyRoom;
