import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { Navigation } from './components/Navigation.tsx';
import TrackingPage from './pages/TrackingPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import { Footer } from './components/Footer.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div className=''>
      <Navigation />
    </div>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/tracking' element={<TrackingPage />} />
    </Routes>
    <div className='mt-2'>
      <Footer />
    </div>
  </BrowserRouter>
);
