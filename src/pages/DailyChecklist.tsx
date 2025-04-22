import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import DailyCheckYearMonthButton from '../Organisms/DailyCheck/DailyCheckYearMonthButton';
import XrayRoom13 from '../templates/daily-checklist/XrayRoom13';
import XrayRoom15 from '../templates/daily-checklist/XrayRoom15';

const DailyChecklist = () => {
  const [displayRoom, setDisplayRoom] = useState('13番撮影室');
  const renderDisplayRoom = () => {
    switch (displayRoom) {
      case '13番撮影室':
        return <XrayRoom13 />;
      case '15番撮影室':
        return <XrayRoom15 />;
    }
  };

  return (
    <>
      <Box>
        <DailyCheckYearMonthButton
          displayRoom={displayRoom}
          setDisplayRoom={setDisplayRoom}
        />
        {renderDisplayRoom()}
        {/* <Outlet /> */}
        <Link to='XrayRoom13' className='no-print'>
          13番撮影室
        </Link>
        <br />
        <Link to='XrayRoom15' className='no-print'>
          15番撮影室
        </Link>
      </Box>
    </>
  );
};

export default DailyChecklist;
