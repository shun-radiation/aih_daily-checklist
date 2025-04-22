import { Box, Stack, Typography } from '@mui/material';

const XrayRoom13 = () => {
  const startupChecklist = [
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
    '1.電源投入後、表示灯の確認',
  ];

  const shutdownChecklist = [
    '1.撮影室の整理・整頓',
    '1.撮影室の整理・整頓',
    '1.撮影室の整理・整頓',
    '1.撮影室の整理・整頓',
    '1.撮影室の整理・整頓',
    '1.撮影室の整理・整頓',
    '1.撮影室の整理・整頓',
  ];

  const weekendChecklist = [
    '1.撮影室の清掃',
    '1.撮影室の清掃',
    '1.撮影室の清掃',
    '1.撮影室の清掃',
    '1.撮影室の清掃',
    '1.撮影室の清掃',
    '1.撮影室の清掃',
  ];

  // maxWidth: '297mm',
  // maxHeight: '210mm',
  // printのmargin上下左右 10pxずつ
  const printHight: string = 'calc(297mm - 20px)';
  const printWidth: string = 'calc(210mm - 20px)';

  const printHeaderHight: string = '50px';
  const printDateHight: string = '35px';
  const printFooterHight: string = '18px';

  const checkItemLength: number =
    startupChecklist.length +
    shutdownChecklist.length +
    weekendChecklist.length;

  const checkItemHight: string = `calc((${printHight.replace(
    'calc',
    '_'
  )} - ${printHeaderHight} - ${printDateHight} - ${printFooterHight}) / ${checkItemLength})`;

  // なんとなく25pxぐらい
  const checkItemMaxHight: string = '25px';

  // console.log(checkItemHight);
  return (
    <Box className='print-conainer no-break' sx={{ backgroundColor: '#fda' }}>
      <Box
        className='print-conainer no-break'
        sx={{
          maxWidth: printHight,
          maxHeight: printWidth,
          m: 'auto',
          // py: 'auto',
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          // textAlign: 'center',
          backgroundColor: 'green',
          border: '5px solid red',
        }}
      >
        {/* 上段 printHeader */}
        {/* <DailyCheckHeader printHeaderHight={printHeaderHight} /> */}
        <>
          {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            height: printHeaderHight,
            borderBottom: 2,
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
                  border: 2,
                  height: printHeaderHight,
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
                    <Box sx={{ height: '40px', width: '100%', borderTop: 2 }}></Box>
                    </Stack>
                    <Stack
                    sx={{
                      width: '50%',
                      display: 'flex',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderLeft: 2,
                      }}
                      >
                      <Typography>放射線機器管理委員</Typography>
                      <Box sx={{ height: '40px', width: '100%', borderTop: 2 }}></Box>
                      </Stack>
                      </Box>
                      </Box> */}
        </>

        {/* 中段@日付 printDate */}
        <Box
          sx={{
            display: 'flex',
            height: printDateHight,
            backgroundColor: 'grey',
            borderBottom: '1px solid blue',
          }}
        >
          <Typography
            sx={{
              width: '25%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'pink',
              height: printDateHight,
            }}
          >
            点検項目 \ 点検日
          </Typography>
          <Box
            sx={{
              width: '75%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#aaa',
            }}
          >
            {Array.from({ length: 25 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: '4%',
                  height: printDateHight,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderLeft: '1px solid black',
                }}
              >
                <Typography>{index + 1}</Typography>
                <Typography>(月)</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 中段@始業点検 */}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', width: '25%' }}>
            <Typography
              sx={{
                backgroundColor: '#999',
                display: 'flex',
                width: '40px',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
              }}
            >
              始業点検
            </Typography>
            <Stack>
              {Array.from({ length: startupChecklist.length }).map(
                (_, index) => (
                  <Typography
                    key={index}
                    sx={{
                      height: checkItemHight,
                      maxHeight: checkItemMaxHight,
                      borderBottom: '1px solid green',
                      width: '150%',
                    }}
                  >
                    {index + 1}///
                    {startupChecklist[index]}
                  </Typography>
                )
              )}
            </Stack>
          </Box>
          <Box
            sx={{
              width: '75%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'pink',
            }}
          >
            {Array.from({ length: 25 }).map((_, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  width: '4%',
                  borderLeft: '1px solid red',
                }}
              >
                {Array.from({ length: startupChecklist.length }).map(
                  (_, colIndex) => (
                    <Typography
                      key={colIndex}
                      sx={{
                        height: checkItemHight,
                        maxHeight: checkItemMaxHight,
                        borderBottom: '1px solid black',
                      }}
                    >
                      {rowIndex + 1}/{colIndex + 1}
                    </Typography>
                  )
                )}
              </Box>
            ))}
          </Box>
        </Box>
        {/* 中段@終業点検 */}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', width: '25%' }}>
            <Typography
              sx={{
                backgroundColor: '#eee',
                width: '40px',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
              }}
            >
              終業点検
            </Typography>
            <Stack>
              {Array.from({ length: shutdownChecklist.length }).map(
                (_, index) => (
                  <Typography
                    key={index}
                    sx={{
                      height: checkItemHight,
                      maxHeight: checkItemMaxHight,
                      borderBottom: '1px solid pink',
                      width: '200%',
                    }}
                  >
                    {index + 1}///
                    {shutdownChecklist[index]}
                  </Typography>
                )
              )}
            </Stack>
          </Box>
          <Box
            sx={{
              width: '75%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'lightblue',
            }}
          >
            {Array.from({ length: 25 }).map((_, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  width: '4%',
                  borderLeft: '1px solid red',
                }}
              >
                {Array.from({ length: shutdownChecklist.length }).map(
                  (_, colIndex) => (
                    <Typography
                      key={colIndex}
                      sx={{
                        height: checkItemHight,
                        maxHeight: checkItemMaxHight,
                        borderBottom: '1px solid black',
                      }}
                    >
                      {rowIndex + 1}/{colIndex + 1}
                    </Typography>
                  )
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* 中段@週末点検 */}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', width: '25%' }}>
            <Typography
              sx={{
                backgroundColor: 'orange',
                width: '40px',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
              }}
            >
              週末点検
            </Typography>
            <Stack>
              {Array.from({ length: weekendChecklist.length }).map(
                (_, index) => (
                  <Typography
                    key={index}
                    sx={{
                      height: checkItemHight,
                      maxHeight: checkItemMaxHight,
                      borderBottom: '1px solid pink',
                      width: '300%',
                    }}
                  >
                    {index + 1}///
                    {weekendChecklist[index]}
                  </Typography>
                )
              )}
            </Stack>
          </Box>
          <Box
            sx={{
              width: '75%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'lightpink',
            }}
          >
            {Array.from({ length: 25 }).map((_, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  width: '4%',
                  borderLeft: '1px solid red',
                }}
              >
                {Array.from({ length: weekendChecklist.length }).map(
                  (_, colIndex) => (
                    <Typography
                      key={colIndex}
                      sx={{
                        height: checkItemHight,
                        maxHeight: checkItemMaxHight,
                        borderBottom: '1px solid black',
                      }}
                    >
                      {rowIndex + 1}/{colIndex + 1}
                    </Typography>
                  )
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* 中段@備考 */}
        <Box sx={{ display: 'flex', minHeight: '80px', height: 'auto' }}>
          <Typography
            sx={{
              backgroundColor: 'pink',
              width: '40px',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}
          >
            備考
          </Typography>
          <Box
            sx={{
              backgroundColor: 'red',
              flex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              pl: 1,
            }}
          >
            <Stack>
              <Typography>
                ※手指消毒液の残量・使用本数は感染管理委員会のExcelファイルに記入
              </Typography>
              <Typography>
                ※CBCT検査申込書(6ヶ月保管)ファイルに1ヶ月分の申込書を綴じ、6ヶ月を超えた申込書を廃棄してください。
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* 下段 */}
        {/* <DailyCheckFooter printFooterHight={printFooterHight} /> */}
        <>
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              height: printFooterHight,
              border: '1px solid black',
            }}
          >
            <Typography sx={{ fontSize: '10px', pr: '2px', pt: '2px' }}>
              最終改訂：2025/01/01
            </Typography>
          </Box> */}
        </>
      </Box>
      {/* <Button onClick={() => window.print()} className='no-print'>
        印刷
      </Button> */}
    </Box>
  );
};

export default XrayRoom13;
