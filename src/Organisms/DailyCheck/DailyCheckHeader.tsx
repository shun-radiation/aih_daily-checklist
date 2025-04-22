import { Box, Grid, Stack, Typography } from '@mui/material';

interface DailyCheckHeaderProps {
  printHeaderHeight: number;
}

const DailyCheckHeader: React.FC<DailyCheckHeaderProps> = ({
  printHeaderHeight,
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
            alignItems: 'center',
            width: '100%',
            px: '40px',
          }}
        >
          <Grid>13番撮影室</Grid>
          <Grid>2025年1月</Grid>
          <Grid>aaa病院 aaaaaaaa</Grid>
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
