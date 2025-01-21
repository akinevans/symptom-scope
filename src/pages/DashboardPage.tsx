import { useState, useEffect } from 'react';
import { DashBarChart } from '@/components/charts/DashBarChart';
import { DashLineChart } from '@/components/charts/DashLineChart';
import { DashPieChart } from '@/components/charts/DashPieChart';
import { generateTrackedList } from '@/utility_functions/utility_functions';
import supabase from '../supabase-client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  const [symptom, setSymptom] = useState<any[]>([]);

  const currentYear = new Date().getFullYear().toString();

  const generateChartData = (data: any[], metric: string): any[] => {
    console.clear();
    // console.log(data);

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

    console.log(chartData);
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
        <Card className='w-fit max-h-[400px]'>
          <CardHeader>
            <CardTitle>Medications</CardTitle>
            <CardDescription>All Tracked Medications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[260px] overflow-y-scroll'>
              {generateTrackedList(symptom, [
                'medicationOne',
                'medicationTwo',
                'medicationThree',
                'medicationFour',
              ]).map((med: string) => (
                <Card className='mx-auto my-2 w-full h-fit flex justify-center items-center'>
                  <CardContent className=' p-1 flex justify-center items-center'>
                    {med}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='w-fit max-h-[400px]'>
          <CardHeader>
            <CardTitle>Symptoms</CardTitle>
            <CardDescription>All Tracked Symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[260px] overflow-y-scroll'>
              {generateTrackedList(symptom, ['name']).map((name: string) => (
                <Card className='mx-auto my-2 w-full h-fit flex justify-center items-center'>
                  <CardContent className=' p-1 flex justify-center items-center'>
                    {name}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className=' w-full flex flex-row flex-wrap gap-2 justify-evenly'>
        {/* //& PIE CHART */}
        <DashPieChart />

        <DashLineChart
          title='Average Symptom Severity'
          description={`January - December `}
          chartData={generateChartData(symptom, 'severity')}
        />

        <DashLineChart
          title='Average Stress Level'
          description={`January - December `}
          chartData={generateChartData(symptom, 'stressLevel')}
        />

        <DashBarChart
          title='Average Duration'
          description={`January - December `}
          chartData={generateChartData(symptom, 'duration')}
        />

        <DashBarChart
          title='Average Severity'
          description={`January - December`}
          chartData={generateChartData(symptom, 'severity')}
        />
      </div>
    </div>
  );
}
