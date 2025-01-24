import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from './ui/separator';

export function SidebarMenu(props) {
  const handleValueChange = (value: string) => {
    props.setSort(value);
  };

  return (
    <Card className=' mb-2 w-[410px] '>
      <CardHeader>
        <CardTitle className=' text-lg font-normal'>
          Track New Symptom
        </CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className=' flex flex-col space-y-1.5'>
              <Button
                onClick={() => {
                  alert('New Entry Btn Clicked');
                }}
              >
                + New Entry
              </Button>
              <Input id='name' placeholder='Search' />
            </div>
            <div className='flex justify-center  '>
              <Separator className='w-[80%]' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              {/* //& Sort */}
              <Select onValueChange={handleValueChange}>
                <SelectTrigger id='sort'>
                  <SelectValue placeholder='Sort' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='Date Ascending'>Date Ascending</SelectItem>
                  <SelectItem value='Date Descending'>
                    Date Descending
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* //& Filter */}
              <Select>
                <SelectTrigger id='filter'>
                  <SelectValue placeholder='Filter' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='Mild'>Mild</SelectItem>
                  <SelectItem value='Moderate'>Moderate</SelectItem>

                  <SelectItem value='Severe'>Severe</SelectItem>
                  <SelectItem value='Very Severe'>Very Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
}
