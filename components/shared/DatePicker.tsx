'use client';

import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFoodContext } from '@/context/FoodContext';
import { cn, datetimeToDate, dateToDatetime, humanDate } from '@/lib/utils';
import { Button } from "@/components/ui/button";

export function DatePicker() {
  const foodCtx = useFoodContext();
  const date = dateToDatetime(foodCtx.currentDate);

  const handleOnSelect = (date?: Date) => {
    if (date) {
      foodCtx.setCurrentDate(datetimeToDate(date));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-56 justify-start flex items-center gap-3 font-normal float-end',
            !date && 'text-muted-foreground'
          )}
        >
          <div className="flex-none"><CalendarIcon /></div>
          <div className="grow">{humanDate(foodCtx.currentDate)}</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleOnSelect}
          showOutsideDays={false}
          defaultMonth={date}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
