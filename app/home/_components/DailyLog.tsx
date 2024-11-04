'use client';

import { useFoodContext } from '@/context/FoodContext';
import { foodDisplayName } from '@/lib/fatsecret/api';
import { FileClockIcon, ScrollIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CardWrapper from '@/components/shared/CardWrapper';
import CardInfo from '@/components/shared/CardInfo';
import Spinner from '@/components/shared/Spinner';

export default function DailyLog() {
  const foodCtx = useFoodContext();

  return (
    <CardWrapper
      label="Daily Log"
      labelIcon={FileClockIcon}
      gridClasses="lg:col-span-4 lg:row-span-2"
    >
      {foodCtx.foodsLoading && <Spinner />}
      {!foodCtx.foodsLoading && foodCtx.foods.length === 0 && (
        <CardInfo text="There are no entries in log yet" icon={ScrollIcon} />
      )}
      {!foodCtx.foodsLoading && foodCtx.foods.length > 0 && (
        <ScrollArea type='always'>
          <ul className="list-disc ml-5">
            {foodCtx.foods.map((food, index) => (
              <li key={index} className="mb-2 items-center">
                <span className="font-bold">{foodDisplayName(food)}</span>
                <ul className="leading-6">
                  {food.servings.serving.map((serving) => {
                    return (
                      <li key={serving.serving_id} className="ml-2 font-bold">
                        -{' '}
                        <span className="text-bold-muted">
                          {serving.serving_description} x {serving.quantity}
                        </span>
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
  );
}
