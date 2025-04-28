import { FC } from 'react';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import { DeviceInspection } from '../../types/types';
import DailyCheckHeader from '../../Organisms/DailyCheck/DailyCheckHeader';
import DailyCheckDateRow from '../../Organisms/DailyCheck/DailyCheckDateRow';
import DailyCheckListItems from '../../Organisms/DailyCheck/DailyCheckListItems';
import DailyCheckRemarks from '../../Organisms/DailyCheck/DailyCheckRemarks';
import DailyCheckFooter from '../../Organisms/DailyCheck/DailyCheckFooter';

const inspectionData: DeviceInspection = {
  //   deviceId: '51A-room',
  //   deviceName: '操作廊下 (51A)',
  inspections: [
    {
      category: ['始業点検'],
      items: [
        {
          label: 'Po処理用機器の再起動 (コンソール・読取装置)',
          frequency: 'daily_weekdays',
        },
        { label: '医療廃棄物の確認 (8割で廃棄)', frequency: 'daily_weekdays' },
        {
          label: '待合廊下の窓開け (10cm程度ずつ)',
          frequency: 'daily_weekdays',
        },
        {
          label: 'IP検査前アラーム設定 (iPhoneの有無確認)',
          frequency: 'daily_weekdays',
        },
        { label: 'ICU・OP室 再起動マグネット', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
        {
          label: 'QA station : データの削除 (QA1・QA2)',
          frequency: 'daily_weekdays',
        },
        {
          label: 'QA station : 再起動 (QA1・QA2)',
          frequency: 'daily_weekdays',
        },
        {
          label: 'QA station : RadiCS (モニターパターンチェック)',
          frequency: 'daily_weekdays',
        },
        { label: '実施者サイン', frequency: 'flexible' },
        {
          label: 'T-SUB ワークステーション : システム終了',
          frequency: 'daily_weekdays',
        },
        {
          label: 'T-SUB ワークステーション : PCの再起動',
          frequency: 'daily_weekdays',
        },
        { label: '実施者サイン', frequency: 'flexible' },
        { label: 'VINCENT 1 (右側) 再起動', frequency: 'daily_weekdays' },
        { label: 'VINCENT 6 (左側) 再起動', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
        { label: 'RIS監視用モニター', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
        {
          label: ['画質確認 (QA2) \u00A0\u00A0 ER撮影装置', '確認者サイン'],
          frequency: 'daily_weekdays',
        },
        {
          label: ['画質確認 (QA2) \u00A0\u00A0 ER透視装置', '確認者サイン'],
          frequency: 'daily_weekdays',
        },
        {
          label: [
            '画質確認 (QA2) \u00A0\u00A0 ER (CALNEO Go ㉜)',
            '確認者サイン',
          ],
          frequency: 'first-WeekdayOfWeek',
        },
        {
          label: [
            '画質確認 (synapse) \u00A0\u00A0 OP室 (Mobile DaRt ㉛) ',
            '確認者サイン',
          ],
          frequency: 'first-WeekdayOfWeek',
        },
        {
          label: [
            '画質確認 (synapse) \u00A0\u00A0 ICU (CALNEO Go ㉚',
            '確認者サイン',
          ],
          frequency: 'first-WeekdayOfWeek',
        },
      ],
    },
    {
      category: ['終業点検'],
      items: [
        { label: 'Po用カセッテの清掃 (11時以降)', frequency: 'daily_weekdays' },
        {
          label: 'Po用カセッテの清掃 (業務終了前)',
          frequency: 'daily_weekdays',
        },
        {
          label: 'ポータブル装置の電源プラグ接続確認',
          frequency: 'daily_weekdays',
        },
        {
          label: 'Epicondylar view 計測 (翌日分)',
          frequency: 'daily_weekdays',
        },
        {
          label: '待合廊下の椅子・手すり・ドアノブの清掃',
          frequency: 'daily_weekdays',
        },
        { label: '待合廊下の窓閉め', frequency: 'daily_weekdays' },
        { label: '実施者サイン', frequency: 'flexible' },
      ],
    },
    {
      category: ['月間点検', '週間点検'],
      items: [
        {
          label: '仕上げ室周辺のモニター等の清掃 (週末)',
          frequency: 'last-WeekdayOfWeek',
        },
        {
          label: 'OP室DRYPIX フィルム枚数確認 (月末)',
          frequency: 'monthly_last',
        },
        { label: '不明書物の整理・廃棄 (月末)', frequency: 'monthly_last' },
        { label: '時計の時間合わせ (月末)', frequency: 'monthly_last' },
        {
          label: 'プロテクターの定期点検 (2,8月の最終週)',
          frequency: 'feb_and_aug',
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

type XrayRoom51AProps = {
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

const XrayRoom51A: FC<XrayRoom51AProps> = ({
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
                  allCheckCellsWidthPx={750}
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

export default XrayRoom51A;
