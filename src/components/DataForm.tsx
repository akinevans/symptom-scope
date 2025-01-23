'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import supabase from '../supabase-client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  // ^ to make an input REQUIRED, remove the optional method below
  //! if it is NULLABLE in the table it MUST be optional here
  date: z.coerce.date(),
  name: z.string(),
  severity: z.number().min(1).max(10).default(5),
  duration: z.number().min(0.5).max(24).default(1),
  stressLevel: z.number().min(1).max(10).default(2),
  areaOne: z.string(),
  areaTwo: z.string().optional(),
  areaThree: z.string().optional(),
  areaFour: z.string().optional(),
  medicationOne: z.string().optional(),
  medicationTwo: z.string().optional(),
  medicationThree: z.string().optional(),
  medicationFour: z.string().optional(),
  notes: z.string().optional(),
});

export default function DataForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function getRandomDateIn2025() {
    const start = new Date(2025, 0, 1); // January 1, 2025
    const end = new Date(2025, 11, 31); // December 31, 2025

    const randomTimestamp =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());

    return new Date(randomTimestamp);
  }

  const generateTestData = async () => {
    try {
      for (const testData of sampleData) {
        const { data, error } = await supabase
          .from('symptomTable')
          .insert([testData]);
        if (error) {
          console.error('Error submitting Test Data', error);
        }
      }
    } catch (error) {
      console.error('Error in generateTestData function', error);
    }
    refreshPage();
  };

  const placeholderText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  const sampleData = [
    {
      date: getRandomDateIn2025(),
      name: 'Headache',
      stressLevel: 3,
      severity: 7,
      duration: 6,
      areaOne: 'Head',
      medicationOne: 'Tylenol',
      notes: placeholderText,
    },
    {
      date: getRandomDateIn2025(),
      name: 'Back Pain',
      stressLevel: 5,
      severity: 2,
      duration: 8,
      areaOne: 'Back',
      medicationOne: 'Ibuprofen',
      notes: placeholderText,
    },
    {
      date: getRandomDateIn2025(),
      name: 'Stomach Ache',
      stressLevel: 2,
      severity: 4,
      duration: 12,
      areaOne: 'Stomach',
      medicationOne: 'Pepto Bismol',
      notes: placeholderText,
    },
    {
      date: getRandomDateIn2025(),
      name: 'Migraine',
      stressLevel: 7,
      severity: 9,
      duration: 11,
      areaOne: 'Head',
      medicationOne: 'Excedrin',
      notes: placeholderText,
    },
    {
      date: getRandomDateIn2025(),
      name: 'Allergy',
      stressLevel: 4,
      severity: 5,
      duration: 2,
      areaOne: 'Nose',
      medicationOne: 'Claritin',
      notes: placeholderText,
    },
    {
      date: getRandomDateIn2025(),
      name: 'Heat Rash',
      stressLevel: 10,
      severity: 3,
      duration: 16,
      areaOne: 'Arm',
      medicationOne: 'Aloe Vera',
      notes: placeholderText,
    },
    {
      date: getRandomDateIn2025(),
      name: 'Dry Mouth',
      stressLevel: 1,
      severity: 2,
      duration: 4.5,
      areaOne: 'Mouth',
      medicationOne: 'Salagen',
      notes: placeholderText,
    },
  ];

  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //FIXME: reapply RLS row-level security in supabase table later
    try {
      const { data, error } = await supabase
        .from('symptomTable')
        .insert([values])
        .single();

      if (error) {
        console.log(error);
      }
      console.log(data);

      ///
      ///

      // console.log(values);
      toast(
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      );

      refreshPage();
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='ml-4 p-6 w-[60vw] max-w-[900px]  py-10 bg-white rounded-lg'
      >
        {/* //& DATE - auto selects time including seconds */}
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col mb-4'>
              <FormLabel className='text-left'>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>Date</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-12 gap-4  text-left'>
          <div className='col-span-6'>
            {/* //& SYMPTOM TITLE */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormLabel className=''>Symptom *</FormLabel>
                  <FormDescription>
                    What symptom are you experiencing?
                  </FormDescription>
                  <FormControl>
                    <Input placeholder='' type='text' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            {/* //& SEVERITY */}
            <FormField
              control={form.control}
              name='severity'
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Severity - {value || 5}</FormLabel>
                  <FormDescription>
                    Adjust by sliding left or right.
                  </FormDescription>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={[5]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* //& AFFECTED AREAS */}

        <div className='grid grid-cols-12 gap-4  text-left'>
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='areaOne'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affected Area(s) *</FormLabel>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder='Hands'
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='areaTwo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='invisible'>hidden</FormLabel>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder='Face'
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='areaThree'
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder=''
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='areaFour'
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder=''
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4 mt-8 text-left'>
          <div className='col-span-6'>
            {/* //& DURATION SLIDER */}
            <FormField
              control={form.control}
              name='duration'
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>{`Duration - ${value || 1} ${
                    value && value > 1 ? 'Hours' : 'Hour'
                  } `}</FormLabel>
                  <FormDescription>
                    Adjust by sliding left or right.
                  </FormDescription>
                  <FormControl>
                    <Slider
                      min={0.5}
                      max={24}
                      step={0.5}
                      defaultValue={[1]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            {/* //& STRESS LEVEL SLIDER */}
            <FormField
              control={form.control}
              name='stressLevel'
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Stress Level - {value || 2}</FormLabel>
                  <FormDescription>
                    Adjust by sliding left or right.
                  </FormDescription>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={[2]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* //& MEDICATIONS */}

        <div className='grid grid-cols-12 gap-4 mt-8 text-left'>
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='medicationOne'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medication(s)</FormLabel>
                  <FormDescription>
                    What have you used for treatment?
                  </FormDescription>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder='Tylenol'
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='medicationTwo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='invisible'>hidden</FormLabel>
                  <FormDescription className='invisible'>
                    hidden
                  </FormDescription>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder='Benadryl'
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='medicationThree'
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder=''
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='medicationFour'
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder=''
                      type=''
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4 mt-8 text-left'>
          {/* //& NOTES */}
          <div className='col-span-12'>
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem className='mb-6 text-left'>
                  <FormLabel>Notes</FormLabel>
                  <FormDescription>
                    Any extra notes that may be relevant.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=''
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type='submit'>Submit</Button>
        <Button
          className='m-2 bg-orange-600'
          onClick={() => {
            generateTestData();
          }}
        >
          Make Test Data
        </Button>
      </form>
    </Form>
  );
}
