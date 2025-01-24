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

//TODO
//  Home Page
//  About Page
//  Contact Page
//  Privacy Policy Page
//* App.tsx - Sort cards by date ascending / descending
//* App.tsx  - Sort cards by intensity
// Login functionality and supabase RLS
// calculate % change from first date - last date for dashboard charts
// Redux for persisting user sort / filter choices, selected symptomCard

function App() {
  // console.clear();

  const [symptomsList, setSymptomsList] = useState<any[]>([]);
  // console.log(symptomsList);

  const getData = async () => {
    const { data, error } = await supabase.from('symptomTable').select('*');

    if (error) {
      console.log(error);
    } else {
      sortSymptomsByDate(data);
    }
    // console.log(data);
  };

  const sortSymptomsByDate = (list, ascending = true) => {
    const sortedList = [...list].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return ascending ? dateA - dateB : dateB - dateA;
    });
    setSymptomsList(sortedList);
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
