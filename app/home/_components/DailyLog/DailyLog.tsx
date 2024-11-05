'use client';

import { useFoodContext } from '@/context/FoodContext';
import { FatsecretFood, FatsecretServing, foodDisplayName } from '@/lib/fatsecret/api';
import { FileClockIcon, ScrollIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CardWrapper from '@/components/shared/CardWrapper';
import CardInfo from '@/components/shared/CardInfo';
import Spinner from '@/components/shared/Spinner';
import DailyLogLabel from './DailyLogLabel';
import DailyLogRemoveIcon from './DailyLogRemoveIcon';
import { useState } from 'react';
import RemoveRecordDialog from './RemoveRecordDialog';

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
        {foodCtx.foodsLoading && <Spinner />}
        {!foodCtx.foodsLoading && foodCtx.foods.length === 0 && (
          <CardInfo text="There are no entries in log yet" icon={ScrollIcon} />
        )}
        {!foodCtx.foodsLoading && foodCtx.foods.length > 0 && (
          <ScrollArea type="always">
            <ul className="list-disc ml-5">
              {foodCtx.foods.map((food, index) => (
                <li key={index} className="mb-2 items-center">
                  <span className="flex gap-2">
                    <span className="font-bold">{foodDisplayName(food)}</span>{' '}
                    <DailyLogRemoveIcon ariaLabel="Remove food" className="w-5 h-5 mb-2" onClickHandler={() => removeRecordClickHandler(food)} />
                  </span>
                  <ul className="leading-6">
                    {food.servings.serving.map((serving) => {
                      return (
                        <li
                          key={serving.serving_id}
                          className="ml-2 flex gap-2"
                        >
                          -{' '}
                          <span className="font-bold text-bold-muted">
                            {serving.serving_description} x {serving.quantity}
                          </span>
                          <DailyLogRemoveIcon ariaLabel="Remove serving" className="w-4 h-4 mb-1" onClickHandler={() => removeRecordClickHandler(food, serving)} />
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardWrapper>
    </>
  );
}
