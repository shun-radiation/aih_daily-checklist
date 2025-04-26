import { Box, Typography } from '@mui/material';

interface DailyCheckFooterProps {
  printFooterHeight: number;
  finalRevision: string;
}

const DailyCheckFooter: React.FC<DailyCheckFooterProps> = ({
  printFooterHeight,
  finalRevision,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        height: `${printFooterHeight}mm`,
        boxSizing: 'border-box',
      }}
    >
      <Typography sx={{ fontSize: '10px', pr: '2px', pt: '2px' }}>
        最終改訂：{finalRevision}
      </Typography>
    </Box>
  );
};

export default DailyCheckFooter;
