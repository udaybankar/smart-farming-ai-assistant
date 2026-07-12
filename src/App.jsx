import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import Home        from './pages/Home';
import Dashboard   from './pages/Dashboard';
import CropDisease from './pages/CropDisease';
import Weather     from './pages/Weather';
import Fertilizer  from './pages/Fertilizer';
import Chatbot     from './pages/Chatbot';
import About       from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/disease"    element={<CropDisease />} />
          <Route path="/weather"    element={<Weather />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/chatbot"    element={<Chatbot />} />
          <Route path="/about"      element={<About />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
