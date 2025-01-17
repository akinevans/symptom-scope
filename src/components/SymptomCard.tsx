import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { EllipsisVertical } from 'lucide-react';
import { NavLink } from 'react-router';

export default function SymptomCard(props) {
  return (
    <div className='relative'>
      {/* //& Menu modal */}
      {/* //! hidden DOM piece MenuBar, breaks layout of vertical symptom bars */}
      <Menubar className='h-0 border-none p-0'>
        <MenubarMenu>
          <MenubarTrigger>
            <EllipsisVertical
              color='#65768c'
              className='absolute top-[30px] right-5 mr-[-15px] cursor-pointer'
              onClick={() => {
                // alert('menu btn clicked');
              }}
            />
          </MenubarTrigger>
          <MenubarContent className='absolute top-8 left-[400px]'>
            <MenubarItem
              onClick={() => {
                alert('edit');
              }}
            >
              {' '}
              Edit
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem>Archive</MenubarItem>

            <MenubarItem
              onClick={() => {
                alert('delete');
              }}
            >
              Delete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <NavLink
        to='#'
        onClick={() => {
          alert('Symptom Card Clicked');
        }}
      >
        <Card className=' max-w-[410px] '>
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
            <p className='text-left line-clamp-2 '>{props.note}</p>
          </CardContent>
        </Card>
      </NavLink>
    </div>
  );
}
