import { useState, useEffect } from 'react';
import { SidebarMenu } from '@/components/SidebarMenu';
import SymptomCard from '@/components/SymptomCard';
import DataForm from '@/components/DataForm';
import supabase from '../supabase-client';
import {
  formatFullDate,
  getSeverityBadge,
} from '@/utility_functions/utility_functions';

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
