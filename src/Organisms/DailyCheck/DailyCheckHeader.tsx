import { Box, Grid, Stack, Typography } from '@mui/material';
// import { DeviceInspection } from '../../types/types';

interface DailyCheckHeaderProps {
  displayRoom: string;
  printHeaderHeight: number;
  dailyChecklistYear: number;
  dailyChecklistMonth: number;
}

const DailyCheckHeader: React.FC<DailyCheckHeaderProps> = ({
  displayRoom,
  printHeaderHeight,
  dailyChecklistYear,
  dailyChecklistMonth,
}) => {
  return (
    //  上段 printHeader
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: `${printHeaderHeight}mm`,
        boxSizing: 'border-box',

        // pb: 1,
      }}
    >
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          textAlign: 'center',
        }}
      >
        <Grid
          container
          direction='row'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            width: '100%',
            px: 2,
            pb: 1,
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}
          >
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '20px',
              }}
            >
              保守点検表
            </Typography>
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '20px',
              }}
            >
              {displayRoom}
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: '500', fontSize: '25px' }}>
            {`${dailyChecklistYear}年${dailyChecklistMonth}月`}
          </Typography>

          <Box
            sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}
          >
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '20px',
              }}
            >
              飯塚病院
            </Typography>
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '20px',
              }}
            >
              中央放射線部
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '30%',
          border: ' 3px solid black',
          borderBottom: 0,
          boxSizing: 'border-box',
          height: `${printHeaderHeight}mm`,
        }}
      >
        <Stack
          sx={{
            width: '50%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontWeight: '500' }}>所属長</Typography>
          <Box
            sx={{
              height: '85%',
              width: '100%',
              borderTop: '3px solid black',
              boxSizing: 'border-box',
            }}
          ></Box>
        </Stack>
        <Stack
          sx={{
            width: '50%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '3px solid black',
            boxSizing: 'border-box',
          }}
        >
          <Typography sx={{ fontWeight: '500' }}>放射線機器管理委員</Typography>
          <Box
            sx={{
              height: '85%',
              width: '100%',
              borderTop: '3px solid black',
              boxSizing: 'border-box',
            }}
          ></Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default DailyCheckHeader;
