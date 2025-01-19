import React, { useState, useEffect } from 'react';
import { DashBarChart } from '@/components/charts/DashBarChart';
import supabase from '../supabase-client';
import {
  formatMonth,
  monthNumToWord,
} from '@/utility_functions/utility_functions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  const [symptom, setSymptom] = useState<any[]>([]);

  const capitalizeString = (text: string): string =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const generateList = (symptom: any[], keys: string[]): string[] => {
    const trackedItems = new Set<string>();

    symptom.forEach((s) =>
      keys.forEach((key) => {
        if (s[key]) trackedItems.add(capitalizeString(s[key]));
      })
    );

    return Array.from(trackedItems);
  };

  const currentYear = new Date().getFullYear().toString();

  const generateChartData = (data: any[], metric: string): any[] => {
    console.clear();
    console.log(data);

    const months = [
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
    const chartData = months.map((month) => ({ month, level: 'No data' }));

    const monthlyEntries = data
      .filter((entry) => entry.date.startsWith(currentYear) && entry[metric])
      .map((entry) => ({
        month: Number(entry.date.substring(5, 7)),
        level: entry[metric],
      }));

    const averages = getAverages(monthlyEntries);

    averages.forEach(({ month, average }) => {
      const monthName = months[month - 1];
      const target = chartData.find((item) => item.month === monthName);
      if (target) target.level = average;
    });

    return chartData;
  };

  const getAverages = (entries: { month: number; level: number }[]) => {
    const monthData: Record<number, { total: number; count: number }> = {};

    entries.forEach(({ month, level }) => {
      if (!monthData[month]) monthData[month] = { total: 0, count: 0 };
      monthData[month].total += level;
      monthData[month].count += 1;
    });

    return Object.entries(monthData).map(([month, { total, count }]) => ({
      month: Number(month),
      average: (total / count).toFixed(1),
    }));
  };

  // const processMultipleEntries = (data: any[], month: string) => {
  //   return data
  //     .filter(
  //       (entry) =>
  //         entry.date.startsWith(currentYear) &&
  //         entry.date.substring(5, 7) === month &&
  //         entry.stressLevel
  //     )
  //     .map((entry) => ({
  //       month: Number(entry.date.substring(5, 7)),
  //       level: entry.stressLevel,
  //     }));
  // };

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
      <div className=' w-full flex flex-row flex-wrap gap-2 justify-evenly'>
        <DashBarChart
          title='Average Stress Levels'
          description={`January - December ${currentYear}`}
          chartData={generateChartData(symptom, 'stressLevel')}
        />

        <DashBarChart
          title='Average Duration'
          description={`January - December ${currentYear}`}
          chartData={generateChartData(symptom, 'duration')}
        />

        <DashBarChart
          title='Average Severity'
          description={`January - December ${currentYear}`}
          chartData={generateChartData(symptom, 'severity')}
        />
      </div>
    </div>
  );
}
