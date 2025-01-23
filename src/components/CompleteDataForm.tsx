'use client';
import { useState, useEffect } from 'react';
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

export default function CompleteDataForm(props) {
  //   const [cardData, setCardData] = useState(props.symptomData);
  const [name, setName] = useState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  // FIXME: use a fetch hook not useEffect
  useEffect(() => {
    setName(props.cardData.name);
  }, [props.cardData]);

  return (
    <Form {...form}>
      <form className='ml-4 p-6 w-[60vw] max-w-[900px]  py-10 bg-white rounded-lg'>
        {/* //& DATE - auto selects time including seconds */}
        <h1 className='text-emerald-600 text-xl'>
          COMPLETE DATA FORM = EDIT MODE ENABLED
        </h1>

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
                    <Input
                      placeholder=''
                      type='text'
                      {...field}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
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
      </form>
    </Form>
  );
}
