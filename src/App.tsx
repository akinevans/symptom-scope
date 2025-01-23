import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import TrackingPage from './pages/TrackingPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import supabase from './supabase-client';

import './App.css';

function App() {
  console.clear();

  const [symptomsList, setSymptomsList] = useState<any[]>([]);

  const getData = async () => {
    const { data, error } = await supabase.from('symptomTable').select('*');

    if (error) {
      console.log(error);
    } else {
      setSymptomsList(data);
    }
    // console.log(data);
  };

  const deleteData = async (id: number) => {
    const { error } = await supabase.from('symptomTable').delete().eq('id', id);

    if (error) {
      console.log(error);
    } else {
      setSymptomsList((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  // FIXME: use a fetch hook not useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <BrowserRouter>
      <div className=''>
        <Navigation />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/dashboard'
          element={
            <DashboardPage symptomData={symptomsList} delete={deleteData} />
          }
        />
        <Route
          path='/tracking'
          element={
            <TrackingPage symptomData={symptomsList} delete={deleteData} />
          }
        />
      </Routes>
      <div className='mt-2'>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
