import { useState, useEffect } from 'react';
import { DashBarChart } from '@/components/charts/DashBarChart';
import { DashLineChart } from '@/components/charts/DashLineChart';
import {
  generateTrackedList,
  formatFullDate,
  getSeverityBadge,
  generateChartData,
} from '@/utility_functions/utility_functions';
import SymptomCard from '../components/SymptomCard';
import supabase from '../supabase-client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  console.clear();
  const [symptom, setSymptom] = useState<any[]>([]);

  const headerMetrics = (data: any[]): string[] => {
    // console.log(data);

    let avgStress: number = 0,
      avgDuration: number = 0,
      avgSeverity: number = 0;

    // get average levels
    for (let i = 0; i < data.length; i++) {
      avgStress += data[i].stressLevel;
      avgDuration += data[i].duration;
      avgSeverity += data[i].severity;
    }
    avgStress = avgStress / data.length;
    avgDuration = avgDuration / data.length;
    avgSeverity = avgSeverity / data.length;

    return [
      avgStress.toFixed(1),
      avgDuration.toFixed(1),
      avgSeverity.toFixed(1),
    ];
  };

  const getLatestSymptoms = (amount: number): any[] | null => {
    const latestEntries = [];

    // check if symptom state is empty
    if (symptom.length === 0) {
      return null;
    }

    for (let i = symptom.length - 1; i >= 0; i--) {
      if (symptom[i] && latestEntries.length < amount) {
        latestEntries.push(symptom[i]);
      }
    }
    // console.log(latestEntries);
    return latestEntries;
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
      <div className='mb-2 flex flex-row w-full justify-between items-center'>
        <Card className='w-fit max-h-[400px]'>
          <CardHeader>
            <CardTitle>Average Stress Level</CardTitle>
            {/* <CardDescription>...</CardDescription> */}
          </CardHeader>
          <CardContent className='text-2xl'>
            {isNaN(headerMetrics(symptom)[0])
              ? 'No Data'
              : headerMetrics(symptom)[0]}
          </CardContent>
        </Card>
        <Card className='w-fit max-h-[400px]'>
          <CardHeader>
            <CardTitle>Average Duration</CardTitle>
            {/* <CardDescription>...</CardDescription> */}
          </CardHeader>
          <CardContent className='text-2xl'>
            {isNaN(headerMetrics(symptom)[1])
              ? 'No Data'
              : headerMetrics(symptom)[1] + ' Hours'}
          </CardContent>
        </Card>
        <Card className='w-fit max-h-[400px]'>
          <CardHeader>
            <CardTitle>Average Severity</CardTitle>
            {/* <CardDescription>...</CardDescription> */}
          </CardHeader>
          <CardContent className='text-2xl'>
            {isNaN(headerMetrics(symptom)[2])
              ? 'No Data'
              : headerMetrics(symptom)[2]}
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-row'>
        <div className='flex flex-col w-fit'>
          <Card className='w-[400px] mb-2'>
            <CardHeader>
              <CardTitle>Latest Symptoms</CardTitle>
              {/* <CardDescription>...</CardDescription> */}
            </CardHeader>
          </Card>
          <div className='flex flex-col gap-2 mb-2'>
            {symptom.length
              ? getLatestSymptoms(3).map((entry) => (
                  <SymptomCard
                    key={entry.id}
                    date={formatFullDate(entry.date)}
                    title={entry.name}
                    severityColor={getSeverityBadge(entry.severity)[1]}
                    severityTitle={getSeverityBadge(entry.severity)[0]}
                    note={entry.notes}
                    delete={() => {
                      // deleteData(entry.id);
                    }}
                  />
                ))
              : 'No data present'}
          </div>
        </div>

        <div className=' mx-2 flex flex-row flex-wrap gap-2'>
          <Card className='w-[250px] max-h-[400px]'>
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
              <div className='w-[250px] h-[260px] overflow-y-scroll'>
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
      </div>

      <div className=' w-full flex flex-row flex-wrap gap-2 justify-evenly'>
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
