import { Button, Paper } from '@mui/material';

const XrayRoom15 = () => {
  return (
    <>
      <div
        id='print-area'
        className='no-break'
        style={{
          height: '700px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
          margin: 0,
          padding: 0,
        }}
      >
        <Paper
          sx={{
            // height: '793px',
            // width: '297mm',
            backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* 中身はここに */}
          <h1>13番撮影室 点検チェック表</h1>
        </Paper>
      </div>
      <Button
        variant='contained'
        onClick={() => window.print()}
        className='no-print'
        sx={{ mt: '20px', display: 'flex', width: '100%', p: 2 }}
      >
        印刷
      </Button>
    </>
  );
};

export default XrayRoom15;
