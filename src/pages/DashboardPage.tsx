import React, { useState, useEffect } from 'react';
import supabase from '../supabase-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  const [symptom, setSymptom] = useState([]);

  const capitalizeString = (text: string): string => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const generateList = (symptom: any, keys: string[]): string[] => {
    const trackedItems: Set<string> = new Set();

    symptom.forEach((s: any) => {
      keys.forEach((key) => {
        if (s[key]) {
          trackedItems.add(capitalizeString(s[key]));
        }
      });
    });

    return Array.from(trackedItems);
  };

  const getData = async () => {
    const { data, error } = await supabase.from('symptomTable').select('*');

    if (error) {
      console.log(error);
    } else {
      setSymptom(data);
    }
    // console.log(data);
  };

  // FIXME: use a fetch hook not useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>

      <div className='flex flex-row flex-wrap gap-2'>
        <Card className='w-fit'>
          <CardHeader>
            <CardTitle>Medications</CardTitle>
            <CardDescription>All Tracked Medications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {generateList(symptom, [
                'medicationOne',
                'medicationTwo',
                'medicationThree',
                'medicationFour',
              ]).map((med: string) => (
                <li key={med} className='text-left'>
                  {med}
                </li>
              ))}
            </ul>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>

        <Card className='w-fit'>
          <CardHeader>
            <CardTitle>Symptoms</CardTitle>
            <CardDescription>All Tracked Symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            {/* loop over trackedMedications array */}
            <ul>
              {generateList(symptom, ['name']).map((sym: string) => (
                <li key={sym} className='text-left'>
                  {sym}
                </li>
              ))}
            </ul>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}
