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

  const currentYear = new Date().getFullYear().toString();

  const generateChartData = (data) => {
    console.clear();
    //FIXME: only show current year, as of now it does not differentiate the months in the year
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
      const entryYear = entry.date.substring(0, 4);

      //check if we are looking at the current year
      if (entryYear === currentYear) {
        if (entry.stressLevel) {
          // TODO: process each month, then get the average stress level, push into chartData

          // get the current entries month as '02' for example
          const monthAsNumericalString = entry.date.substring(5, 7);

          //see if multiple entries exist on that month (year already taken care of)
          // processMultipleEntries(data, monthAsNumericalString);

          //get averages for each month
          const averages = getAverages(
            processMultipleEntries(data, monthAsNumericalString)
          );

          console.log(averages);

          const date = entry.date;
          const month = formatMonth(date.slice(5, 7));

          for (let i = 0; i < chartData.length; i++) {
            if (chartData[i].month === month) {
              chartData[i].level = entry.stressLevel;
            }
          }

          // update chartData with the averages
          for (let i = 0; i < averages.length; i++) {
            const currentMonth = monthNumToWord(averages[i].month);
            console.log(currentMonth);
            if (chartData[i].month !== currentMonth) {
              continue;
            } else {
              chartData[i].level = averages[i].average;
            }
          }
        }

        // if level is not yet in the array, stressLevel is null in the DB, set it to zero
        for (let i = 0; i < chartData.length; i++) {
          if (!chartData[i].level) {
            chartData[i].level = 'No data';
          }
        }
      }
    });

    console.log(chartData);
    return chartData;
  };

  const getAverages = (list) => {
    const monthData = {};

    list.forEach((entry) => {
      const month = entry.month;
      if (!monthData[month]) {
        monthData[month] = { total: 0, count: 0 };
      }
      monthData[month].total += entry.level;
      monthData[month].count += 1;
    });

    const averages = Object.keys(monthData).map((month) => {
      const calculatedAverage = monthData[month].total / monthData[month].count;
      return {
        month: Number(month),
        average: calculatedAverage.toFixed(1),
      };
    });

    return averages;
  };
  const processMultipleEntries = (data, month) => {
    const list: any[] = [];

    // console.log(data);
    // console.log(month);
    // see if multiple entries exist for each month

    data.map((entry) => {
      const dataYear = entry.date.substring(0, 4);
      const dataMonth = entry.date.substring(5, 7);
      // console.log('dataYear: ', dataYear);

      // ensure correct year
      if (dataYear === currentYear && entry.stressLevel) {
        // loop for each month
        const dataMonth = entry.date.substring(5, 7);
        const wantedDate = `${currentYear}-${dataMonth}`;
        // console.log('dataMonth: ', dataMonth);
        // console.log('wantedDate: ', wantedDate);

        if (entry.date.substring(0, 7) === wantedDate) {
          list.push({
            month: Number(dataMonth),
            level: entry.stressLevel,
          });
        }
      }
    });
    // console.log(list);
    return list;
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
        title='Average Stress Levels'
        description={`January - December ${currentYear}`}
        chartData={generateChartData(symptom)}
      />
    </div>
  );
}
