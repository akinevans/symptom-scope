import React from 'react';
import { SidebarMenu } from '@/components/SidebarMenu';
import SymptomCard from '@/components/SymptomCard';
import DataForm from '@/components/DataForm';

export default function TrackingPage() {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col max-h-[1300px] w-fit text-left overflow-scroll'>
        <div className='sticky top-0'>
          <SidebarMenu />
        </div>
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
      </div>
      <DataForm />
    </div>
  );
}
