import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HotelCard from './components/Hotel/HotelCard';
import Header from './components/Header/Header';
import Chain from './containers/Chain';
import Home from './containers/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chain/:param" element={<Chain />} />

      </Routes>
    </Router>

  );
}

export default App;
