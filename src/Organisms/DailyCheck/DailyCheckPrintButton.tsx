import { Button, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const DailyCheckPrintButton = () => {
  return (
    <Button
      variant='contained'
      endIcon={
        <>
          <PrintIcon />
          <FileDownloadIcon />
        </>
      }
      onClick={() => window.print()}
      className='no-print'
      sx={{
        mt: '20px',
        display: 'flex',
        width: '40%',
        mx: 'auto',
        p: 2,
      }}
    >
      <Typography sx={{ fontWeight: '700' }}>印刷</Typography>
    </Button>
  );
};

export default DailyCheckPrintButton;
