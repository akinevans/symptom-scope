import { SidebarMenu } from '@/components/SidebarMenu';
import SymptomCard from '@/components/SymptomCard';
import DataForm from '@/components/DataForm';

import {
  formatFullDate,
  getSeverityBadge,
} from '@/utility_functions/utility_functions';

// TODO:  add multi select to form (medications, triggers / cause etc)

export default function TrackingPage(props) {
  return (
    <div className='flex flex-row max-h-[90vh] '>
      <div className=' flex flex-col max-w-[410px] max-h-[1300px] w-fit text-left'>
        <SidebarMenu />

        <div className='flex flex-col gap-y-2 overflow-y-scroll scroll-smooth'>
          {props.symptomData.map((entry) => (
            <SymptomCard
              key={entry.id}
              date={formatFullDate(entry.date)}
              title={entry.name}
              severityColor={getSeverityBadge(entry.severity)[1]}
              severityTitle={getSeverityBadge(entry.severity)[0]}
              note={entry.notes}
              handleDelete={() => {
                props.delete(entry.id);
              }}
            />
          ))}
        </div>
      </div>
      <DataForm />
    </div>
  );
}
