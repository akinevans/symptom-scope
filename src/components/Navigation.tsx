import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function Navigation() {
  const linkStyles = 'mr-8 text-sm font-normal';

  return (
    <Card className='mb-2 w-[90vw] max-w-[1280px] max-h-[60px] flex flex-row justify-between items-center bg-white shadow-none border-none'>
      <CardHeader className='flex flex-row justify-start items-center'>
        <CardTitle className='min-w-fit text-xl font-normal'>
          Symptom Scope
        </CardTitle>
        <div className='ml-16 w-fit flex justify-between items-center  '>
          <NavLink to='/' className={linkStyles}>
            Home
          </NavLink>

          <NavLink to='/dashboard' className={linkStyles}>
            Dashboard
          </NavLink>
          <NavLink to='/tracking' className={linkStyles}>
            Tracking
          </NavLink>
          <NavLink to='/about' className={linkStyles}>
            About
          </NavLink>
          <NavLink to='/contact' className={linkStyles}>
            Contact
          </NavLink>
        </div>
      </CardHeader>
      <Button className=''>Login</Button>
    </Card>
  );
}
