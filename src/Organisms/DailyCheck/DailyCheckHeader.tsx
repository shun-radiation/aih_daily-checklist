import { Box, Grid, Stack, Typography } from '@mui/material';
import { DeviceInspection } from '../../types';

interface DailyCheckHeaderProps {
  printHeaderHeight: number;
  inspectionData: DeviceInspection;
}

const DailyCheckHeader: React.FC<DailyCheckHeaderProps> = ({
  printHeaderHeight,
  inspectionData,
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
            px: 4,
            pb: 1,
          }}
        >
          <Typography variant='h4'>{inspectionData.deviceName}</Typography>
          <Typography variant='h4'>2025年1月</Typography>
          <Typography variant='h4'>aaa病院 aaaaaaaa</Typography>
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
          <Typography>所属長</Typography>
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
          <Typography>放射線機器管理委員</Typography>
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
