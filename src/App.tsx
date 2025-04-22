import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DailyChecklist from './pages/DailyChecklist';
import Home from './pages/Home';
import Nopage from './pages/Nopage';
// import XrayRoom13 from './templates/daily-checklist/XrayRoom13';
// import XrayRoom15 from './templates/daily-checklist/XrayRoom15';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='daily-checklist' element={<DailyChecklist />}>
            {/* <Route path='XrayRoom13' element={<XrayRoom13 />} /> */}
            {/* <Route path='XrayRoom15' element={<XrayRoom15 />} /> */}
          </Route>
          <Route path='*' element={<Nopage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
