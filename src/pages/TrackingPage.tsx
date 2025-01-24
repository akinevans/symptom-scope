import { useState } from 'react';
import { SidebarMenu } from '@/components/SidebarMenu';
import SymptomCard from '@/components/SymptomCard';
import DataForm from '@/components/DataForm';
import CompleteDataForm from '@/components/CompleteDataForm';

import {
  formatFullDate,
  getSeverityBadge,
} from '@/utility_functions/utility_functions';

// TODO:  add multi select to form (medications, triggers / cause etc)

export default function TrackingPage(props) {
  const [editMode, setEditMode] = useState(false);
  const [currentCard, setCurrentCard] = useState();
  const [sortPreference, setSortPreference] = useState('Date Descending');
  // console.log(sortPreference);

  const handleEditMode = (data) => {
    setCurrentCard(data);
    if (!editMode) {
      setEditMode(true);
    }
    // console.log('editMode: ', editMode, data.id);
  };

  return (
    <div className='flex flex-row max-h-[90vh] '>
      <div className=' flex flex-col max-w-[410px] max-h-[1300px] w-fit text-left'>
        <SidebarMenu sort={sortPreference} setSort={setSortPreference} />

        <div
          className={`flex flex-col gap-y-2 overflow-y-scroll scroll-smooth 
          ${sortPreference === 'Date Ascending' ? '' : 'flex-col-reverse'} 
          `}
        >
          {props.symptomData.map((entry) => (
            <SymptomCard
              key={entry.id}
              date={formatFullDate(entry.date)}
              title={entry.name}
              severityColor={getSeverityBadge(entry.severity)[1]}
              severityTitle={getSeverityBadge(entry.severity)[0]}
              note={entry.notes}
              onClick={() => {
                handleEditMode(entry);
              }}
              handleDelete={() => {
                props.delete(entry.id);
              }}
            />
          ))}
        </div>
      </div>
      {editMode ? (
        <CompleteDataForm
          symptomData={props.symptomData}
          edit={handleEditMode}
          cardData={currentCard}
        />
      ) : (
        <DataForm />
      )}
    </div>
  );
}
