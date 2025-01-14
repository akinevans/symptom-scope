import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function Navigation() {
  return (
    <Card className='mb-2 w-[90vw] max-w-[1340px] max-h-[70px] flex flex-row justify-between items-center bg-inherit shadow-none border-none'>
      <CardHeader className='flex flex-row justify-start items-center'>
        <CardTitle className='min-w-fit text-2xl'>Symptom Scope</CardTitle>
        <div className='ml-16  w-fit flex justify-between items-center '>
          <a className='mr-8 text-md font-semibold' href=''>
            Home
          </a>

          <a className='mr-8 text-md font-semibold' href=''>
            Dashboard
          </a>
          <a
            className='mr-8 text-md font-semibold underline under underline-offset-6 decoration-2'
            href=''
          >
            Tracking
          </a>
          <a className='mr-8 text-md font-semibold' href=''>
            About
          </a>
          <a className='mr-8 text-md font-semibold' href=''>
            Contact
          </a>
        </div>
      </CardHeader>
      <Button className='mr-6'>Login</Button>
    </Card>
  );
}
