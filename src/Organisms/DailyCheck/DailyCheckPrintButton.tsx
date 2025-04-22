import { Button } from '@mui/material';
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
      sx={{ mt: '20px', display: 'flex', width: '100%', p: 2 }}
    >
      印刷
    </Button>
  );
};

export default DailyCheckPrintButton;
