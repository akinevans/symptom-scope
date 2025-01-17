import React, { useState, useEffect } from 'react';
import supabase from '../supabase-client';

export default function DashboardPage() {
  const [symptom, setSymptom] = useState([]);

  const getData = async () => {
    const { data, error } = await supabase.from('symptomTable').select('*');

    if (error) {
      console.log(error);
    } else {
      setSymptom(data);
    }
  };

  // FIXME: use a fetch hook not useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <ul className='mt-8'>
        {symptom.map((entry) => (
          <li key={entry.id} className='flex flex-row gap-4 justify-start'>
            <p>Symptom: {entry.name}</p>
            <p>severity: {entry.severity}</p>
            <p>stress level: {entry.stressLevel}</p>
            <p>duration: {entry.duration}</p>
            <p>date: {entry.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
