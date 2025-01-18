import React, { useState, useEffect } from 'react';
import { DashBarChart } from '@/components/charts/DashBarChart';
import supabase from '../supabase-client';
import { formatMonth } from '@/utility_functions/utility_functions';
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

  const generateChartData = (data) => {
    const chartData: any[] = [];
    const months: string[] = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];

    // Place all months in the chardData arr
    for (let i = 0; i < months.length; i++) {
      chartData.push({ month: months[i] });
    }

    symptom.map((entry) => {
      if (entry.stressLevel) {
        const date = entry.date;
        const month = formatMonth(date.slice(5, 7));
        // chartData.push({ month: formatMonth(month), level: entry.stressLevel });

        for (let i = 0; i < chartData.length; i++) {
          if (chartData[i].month === month) {
            chartData[i].level = entry.stressLevel;
          }
        }
      }
      // if level is not yet in the array, stressLevel is null in the DB, set it to zero

      for (let i = 0; i < chartData.length; i++) {
        if (!chartData[i].level) {
          chartData[i].level = 'No data';
        }
      }
    });
    console.log(chartData);
    return chartData;
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

      <DashBarChart
        title='Stress Levels'
        description='January - December (year?)'
        chartData={generateChartData(symptom)}
      />
    </div>
  );
}
