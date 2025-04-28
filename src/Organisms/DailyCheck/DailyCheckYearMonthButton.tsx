import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack, Typography } from '@mui/material';

type YearMonthRoomButtonProps = {
  dailyChecklistYear: number;
  setDailyChecklistYear: React.Dispatch<React.SetStateAction<number>>;
  dailyChecklistMonth: number;
  setDailyChecklistMonth: React.Dispatch<React.SetStateAction<number>>;
  displayRoom: string;
  setDisplayRoom: React.Dispatch<React.SetStateAction<string>>;
};

const DailyCheckYearMonthRoomButton: React.FC<YearMonthRoomButtonProps> = ({
  dailyChecklistYear,
  setDailyChecklistYear,
  dailyChecklistMonth,
  setDailyChecklistMonth,
  displayRoom,
  setDisplayRoom,
}) => {
  const yearList = [2025, 2026, 2027, 2028, 2029, 2030];
  const monthList = Array.from({ length: 12 }, (_, i) => Number(i + 1));
  const roomList = [
    '13番撮影室',
    '15番撮影室',
    '16番撮影室',
    '17番撮影室',
    '19番撮影室',
    '操作廊下 (51A)',
    'IP室 (12番撮影室)',
    'マンモグラフィー室 (予防医学センター)',
    'マンモグラフィー室 (6番撮影室)',
    'ポータブル装置 (51A) - 日常点検',
    'ポータブル装置 (51A) - 画質点検',
    '救急外来撮影室',
    'ポータブル装置 (ER)',
    '救急外来撮影室物品',
    '骨密度検査室',
    'ポータブル装置 (手術室)',
    'ポータブル装置 (ICU)',
    'ポータブル装置 充電確認 (手術室・ICU)',
  ];

  const handleYearChange = (event: SelectChangeEvent) => {
    setDailyChecklistYear(Number(event.target.value));
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setDailyChecklistMonth(Number(event.target.value));
  };

  const handleSelectRoomChange = (event: SelectChangeEvent) => {
    // setSelectRoom(event.target.value);
    setDisplayRoom(event.target.value);
  };

  return (
    <div
      className='no-print'
      style={{
        height: '50px',
        width: '100%',
        margin: '50px auto',
      }}
    >
      <Stack
        direction='row'
        spacing={2}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 年 */}
        <FormControl required sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id='demo-simple-select-required-label'>Year</InputLabel>
          <Select
            labelId='demo-simple-select-required-label'
            id='demo-simple-select-required'
            value={String(dailyChecklistYear)}
            label='Year *'
            onChange={handleYearChange}
          >
            {yearList.map((year) => (
              <MenuItem key={year} value={year}>
                <Typography sx={{ fontWeight: '500' }}>{year}</Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        {/* 月 */}
        <FormControl required sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id='demo-simple-select-required-label'>Month</InputLabel>
          <Select
            labelId='demo-simple-select-required-label'
            id='demo-simple-select-required'
            value={String(dailyChecklistMonth)}
            label='Month *'
            onChange={handleMonthChange}
          >
            {monthList.map((month) => (
              <MenuItem key={month} value={month}>
                <Typography sx={{ fontWeight: '500' }}>{month}</Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        {/* 撮影室 */}
        <FormControl required sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id='demo-simple-select-required-label'>撮影室</InputLabel>
          <Select
            labelId='demo-simple-select-required-label'
            id='demo-simple-select-required'
            // value={selectRoom}
            value={displayRoom}
            label='撮影室 *'
            onChange={handleSelectRoomChange}
          >
            {roomList.map((room) => (
              <MenuItem key={room} value={room}>
                <Typography sx={{ fontWeight: '500' }}>{room}</Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </Stack>
    </div>
  );
};

export default DailyCheckYearMonthRoomButton;
