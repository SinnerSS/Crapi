import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyConverterPage from './pages/CurrencyConverterPage';
import FluctuationPage from './pages/FluctuationPage'
import TradePage from './pages/TradePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CurrencyConverterPage />} />
        <Route path="/fluctuation" element={<FluctuationPage />} />
        <Route path="/trade" element={<TradePage />} />
      </Routes>
    </Router>
  );
}

export default App;
