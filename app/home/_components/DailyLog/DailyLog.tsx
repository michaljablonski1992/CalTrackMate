'use client';

import { useFoodContext } from '@/context/FoodContext';
import { FatsecretFood, FatsecretServing } from '@/lib/fatsecret/api';
import { FileClockIcon, ScrollIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CardWrapper from '@/components/shared/CardWrapper';
import CardInfo from '@/components/shared/CardInfo';
import Spinner from '@/components/shared/Spinner';
import DailyLogLabel from './DailyLogLabel';
import { useState } from 'react';
import RemoveRecordDialog from './RemoveRecordDialog';
import DailyLogTable from './DailyLogTable';

export type itemToDeleteTypes = [] | [FatsecretFood, FatsecretServing?];

export default function DailyLog() {
  const foodCtx = useFoodContext();
  const [itemToDelete, setItemToDelete] = useState<itemToDeleteTypes>([]);
  const [removeRecordOpen, setRemoveRecordOpen] = useState<boolean>(false);

  //// remove record
  const removeRecordClickHandler = (food: FatsecretFood, serving?: FatsecretServing) => {
    setItemToDelete([food, serving])
    setRemoveRecordOpen(true)
  }
  const removeRecordConfirmedHandler = () => {
    const food = itemToDelete[0];
    const serving = itemToDelete[1];
    if(food) {
      foodCtx.removeFood(food, serving)
    }
    setItemToDelete([])
    setRemoveRecordOpen(false)
  }
  const removeRecordCancelHandler = () => {
    setItemToDelete([])
    setRemoveRecordOpen(false)
  }

  return (
    <>
      <RemoveRecordDialog
        open={removeRecordOpen}
        setOpen={setRemoveRecordOpen}
        confirmationHandler={removeRecordConfirmedHandler}
        cancelHandler={removeRecordCancelHandler}
      />
      <CardWrapper
        label={<DailyLogLabel />}
        labelIcon={FileClockIcon}
        gridClasses="lg:col-span-4 lg:row-span-2"
      >
        {foodCtx.foodFetching && <Spinner />}
        {!foodCtx.foodFetching && foodCtx.foods.length === 0 && (
          <CardInfo text="There are no entries in log yet" icon={ScrollIcon} />
        )}
        {!foodCtx.foodFetching && foodCtx.foods.length > 0 && (
          <ScrollArea type="always">
            <DailyLogTable removeRecordClickHandler={removeRecordClickHandler} />
          </ScrollArea>
        )}
      </CardWrapper>
    </>
  );
}