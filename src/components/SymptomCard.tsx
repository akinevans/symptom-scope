//! use a badge component instead
//^ can do an easy text description max 100 characters rule with css truncate

import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SeverityTag from './SeverityTag';
import { EllipsisVertical } from 'lucide-react';

export default function SymptomCard() {
  const getRandomTitle = () => {
    const titles = [
      'Fatigue',
      'Headache',
      'Chills',
      'Fever',
      'Sore Throat',
      'Muscle Aches',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  function getRandomDate(): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const randomDay = Math.floor(Math.random() * 28) + 1; // To ensure a valid day
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomYear = Math.floor(Math.random() * 7) + 2018;

    return `${randomMonth} ${randomDay} ${randomYear}`;
  }

  return (
    <Card className='mb-2 max-w-[410px] '>
      <CardHeader className='flex flex-row place-content-between align-top text-left'>
        <div className=''>
          <CardDescription>{getRandomDate()}</CardDescription>
          <CardTitle>{getRandomTitle()}</CardTitle>
        </div>
        {/* //& Severity tag and menu icon */}
        <div className='mt-0 flex justify-center items-center h-fit w-fit'>
          <SeverityTag />
          <a href=''>
            <EllipsisVertical
              color='#65768c'
              className='mr-[-15px]'
              onClick={() => {
                alert('menu btn clicked');
              }}
            />
          </a>
        </div>
      </CardHeader>
      <div className='mt-[-5px] mb-4 flex justify-center'>
        <Separator className='w-[70%] flex flex-row justify-center' />
      </div>
      <CardContent>
        <p className='text-left'>
          Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do
          eiusmod tempor incididunt ut.
        </p>
      </CardContent>
      {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
    </Card>
  );
}
