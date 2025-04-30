import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DailyChecklist from './pages/DailyChecklist';
// import Home from './pages/Home';
import Nopage from './pages/Nopage';
// import XrayRoom13 from './templates/daily-checklist/XrayRoom13';
// import XrayRoom15 from './templates/daily-checklist/XrayRoom15';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/' element={<DailyChecklist />} />
            {/* <Route path='daily-checklist' element={<DailyChecklist />} /> */}
            <Route path='*' element={<Nopage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
