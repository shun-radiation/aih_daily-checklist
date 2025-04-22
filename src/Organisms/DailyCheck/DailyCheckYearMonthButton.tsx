import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack } from '@mui/material';

type YearMonthButtonProps = {
  displayRoom: string;
  setDisplayRoom: React.Dispatch<React.SetStateAction<string>>;
};

const DailyCheckYearMonthButton: React.FC<YearMonthButtonProps> = ({
  displayRoom,
  setDisplayRoom,
}) => {
  const [dailyChecklistYear, setDailyChecklistYear] =
    React.useState<string>('2025');
  const [dailyChecklistMonth, setDailyChecklistMonth] =
    React.useState<string>('1');
  // const [selectRoom, setSelectRoom] = React.useState<string>('13番撮影室');

  const yearList = ['2025', '2026', '2027', '2028', '2029', '2030'];
  const monthList = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const roomList = ['13番撮影室', '15番撮影室'];

  const handleYearChange = (event: SelectChangeEvent) => {
    setDailyChecklistYear(event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setDailyChecklistMonth(event.target.value);
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
            value={dailyChecklistYear}
            label='Year *'
            onChange={handleYearChange}
          >
            {yearList.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
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
            value={dailyChecklistMonth}
            label='Month *'
            onChange={handleMonthChange}
          >
            {monthList.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
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
                {room}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </Stack>
    </div>
  );
};

export default DailyCheckYearMonthButton;
