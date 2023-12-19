import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyConverterPage from './pages/CurrencyConverterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CurrencyConverterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
