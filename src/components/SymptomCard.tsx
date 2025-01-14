//^ can do an easy text description max 100 characters rule with css truncate

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { EllipsisVertical } from 'lucide-react';
import { NavLink } from 'react-router';

export default function SymptomCard(props) {
  return (
    <div className='relative'>
      {/* //* placing the ellipsis outside of the NavLink allows for clicking on either the symptomCard OR the ellipses seperatley not both */}
      <EllipsisVertical
        color='#65768c'
        className='absolute top-8 right-5 mr-[-15px] cursor-pointer'
        onClick={() => {
          alert('menu btn clicked');
        }}
      />
      <NavLink
        to='#'
        onClick={() => {
          alert('Symptom Card Clicked');
        }}
      >
        <Card className='mb-2 max-w-[410px] '>
          <CardHeader className='flex flex-row place-content-between align-top text-left'>
            <div className=''>
              <CardDescription className='mb-2'>{props.date}</CardDescription>
              <CardTitle className='text-xl font-normal'>
                {props.title}
              </CardTitle>
            </div>
            {/* //& Severity badge and menu icon */}
            <div className='mt-0 flex justify-center items-center h-fit w-fit'>
              <Badge className={` ${props.severityColor} mr-2 font-medium `}>
                {props.severityTitle}
              </Badge>
            </div>
          </CardHeader>
          <div className='mt-[-5px] mb-4 flex justify-center'>
            <Separator className='w-[70%] flex flex-row justify-center' />
          </div>
          <CardContent>
            <p className='text-left truncate'>{props.note}</p>
          </CardContent>
        </Card>
      </NavLink>
    </div>
  );
}
