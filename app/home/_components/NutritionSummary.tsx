'use client';

import CardWrapper from '@/components/shared/CardWrapper';
import { useFoodContext } from '@/context/FoodContext';
import { getNutritionValues, transformKeyToString } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NotebookTextIcon } from 'lucide-react';
import Spinner from '@/components/shared/Spinner';

export default function NutritionSummary() {
  const foodCtx = useFoodContext();
  let content;

  if (!foodCtx.foodFetching) {
    const values = getNutritionValues(foodCtx.foods, true);

    content = (
      <ScrollArea type="always">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(values).map(([key, val]) => {
            return (
              <p key={key}>
                <span className="font-bold">{transformKeyToString(key)}: </span>
                <span className="text-bold-muted">
                  {val}
                </span>
              </p>
            );
          })}
        </div>
      </ScrollArea>
    );
  } else {
    content = <Spinner />;
  }

  return (
    <CardWrapper
      label="Nutrition Summary"
      labelIcon={NotebookTextIcon}
      gridClasses="lg:row-span-2 lg:col-span-4"
      contentClasses='h-80'
    >
      {content}
    </CardWrapper>
  );
}
