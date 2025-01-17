'use client';
import { useState } from 'react';
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
import { Tag, TagInput } from 'emblor';
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
  duration: z.number().min(1).max(24).default(1).optional(),
  stressLevel: z.number().min(1).max(10).default(5).optional(),
  areaOne: z.string(),
  areaTwo: z.string().optional(),
  areaThree: z.string().optional(),
  notes: z.string().optional(),
});

export default function DataForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

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
        {/* FIXME: time is sometimes incorrect */}
        {/* FIXME: color issues when opening calendar */}
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
        <div className='grid grid-cols-12 gap-4 text-left'>
          <div className='col-span-6'>
            {/* //& SYMPTOM TITLE */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormLabel className=''>Symptom</FormLabel>
                  <FormControl>
                    <Input placeholder='' type='text' {...field} />
                  </FormControl>
                  <FormDescription>
                    What symptom are you experiencing?
                  </FormDescription>
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
                  <FormDescription>
                    Adjust the value by sliding left or right.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 text-left'>
          <div className='col-span-6'>
            {/* //& DURATION SLIDER */}
            {/* <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder='' type='text' {...field} />
                  </FormControl>
                  <FormDescription>
                    How long did you experience this symptom?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name='duration'
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>{`Duration - ${value || 1} ${
                    value && value > 1 ? 'Hours' : 'Hour'
                  } `}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={24}
                      step={0.5}
                      defaultValue={[1]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Adjust the value by sliding left or right.
                  </FormDescription>
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
                  <FormLabel>Stress Level - {value || 5}</FormLabel>
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
                  <FormDescription>
                    Adjust the value by sliding left or right.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* //& AFFECTED AREAS */}
        <div className='grid grid-cols-12 gap-4 text-left'>
          <div className='col-span-6'>
            {/* //^ AREA ONE */}
            <FormField
              control={form.control}
              name='areaOne'
              render={({ field }) => (
                <FormItem className='mb-6 text-left  max-w-[200px]'>
                  <FormLabel>Affected Area(s)</FormLabel>
                  <FormDescription>
                    Where did the symptom occur? E.g. hands, face
                  </FormDescription>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder='Hands'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* //^ AREA TWO */}
            <FormField
              control={form.control}
              name='areaTwo'
              render={({ field }) => (
                <FormItem className='mb-6 text-left  max-w-[200px]'>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder='Face'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* //^ AREA THREE */}
            <FormField
              control={form.control}
              name='areaThree'
              render={({ field }) => (
                <FormItem className='mb-6 text-left max-w-[200px]'>
                  <FormControl>
                    <Input
                      className='placeholder:opacity-60'
                      placeholder='Skin'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* //& NOTES */}
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem className='mb-6 text-left'>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=''
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Any extra notes that may be relevant.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
