import { useState, useEffect } from 'react';
import { SidebarMenu } from '@/components/SidebarMenu';
import SymptomCard from '@/components/SymptomCard';
import DataForm from '@/components/DataForm';
import supabase from '../supabase-client';
import { formatFullDate } from '@/utility_functions/utility_functions';

// TODO:  add multi select to form (medications, triggers / cause etc)

//^FIXME:  Lift state up to parent (Tracking Page) in order to send individual card ID to the form, and populate it with the cards data

export default function TrackingPage() {
  const [symptomCards, setSymptomCards] = useState([]);

  const getData = async () => {
    const { data, error } = await supabase.from('symptomTable').select('*');

    if (error) {
      console.log(error);
    } else {
      setSymptomCards(data);
    }
  };

  const deleteData = async (id: number) => {
    const { error } = await supabase.from('symptomTable').delete().eq('id', id);

    if (error) {
      console.log(error);
    } else {
      setSymptomCards((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const getSeverityBadge = (value: number): string[] => {
    const severities = [
      { title: 'Mild', color: 'text-[#2D5101] bg-[#C0DD78]', range: [1, 3] },
      {
        title: 'Moderate',
        color: 'text-[#6D3A00] bg-[#F5CD6F]',
        range: [4, 6],
      },
      { title: 'Severe', color: 'text-[#81371E] bg-[#F3C6BA]', range: [7, 8] },
      {
        title: 'Very Severe',
        color: 'text-[#8C161E] bg-[#FFC3C9]',
        range: [9, 10],
      },
      {
        title: 'Error',
        color: 'text-[#000] bg-[#EEE]',
        range: [11, 100],
      },
    ];

    for (const severity of severities) {
      if (value >= severity.range[0] && value <= severity.range[1]) {
        return [severity.title, severity.color];
      }
    }

    // Error badge
    return [severities[4].title, severities[4].color];
  };

  // FIXME: use a fetch hook not useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-row max-h-[90vh] '>
      <div className=' flex flex-col max-w-[410px] max-h-[1300px] w-fit text-left'>
        <SidebarMenu />

        <div className='flex flex-col gap-y-2 overflow-y-scroll scroll-smooth'>
          {symptomCards.map((entry) => (
            <SymptomCard
              key={entry.id}
              date={formatFullDate(entry.date)}
              title={entry.name}
              severityColor={getSeverityBadge(entry.severity)[1]}
              severityTitle={getSeverityBadge(entry.severity)[0]}
              note={entry.notes}
              delete={() => {
                deleteData(entry.id);
              }}
            />
          ))}
        </div>
      </div>
      <DataForm />
    </div>
  );
}
