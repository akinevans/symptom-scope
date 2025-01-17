import { NavLink } from 'react-router';
import { Card, CardHeader } from '@/components/ui/card';

export function Footer() {
  const linkStyles = 'mr-8 text-md font-normal';

  return (
    <Card className='w-full max-w-[1280px] max-h-[40px] flex flex-row justify-center items-center bg-white shadow-none border-none'>
      <CardHeader className='flex flex-row justify-start items-center'>
        <div className='ml-16  w-fit flex justify-between items-center '>
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
          <NavLink to='/privacy' className={linkStyles}>
            Privacy Policy
          </NavLink>
        </div>
      </CardHeader>
    </Card>
  );
}
