import CardWrapper from '@/components/shared/CardWrapper';
import { useFoodContext } from '@/context/FoodContext';
import {
  FatsecretServingValues,
  servingValuesUnits,
} from '@/lib/fatsecret/api';
import { transformKeyToString } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NotebookTextIcon } from 'lucide-react';

export default function NutritionSummary() {
  const foodCtx = useFoodContext();
  // Create a new object with empty string values
  const values = Object.keys(servingValuesUnits).reduce<Record<string, string>>(
    (acc, key) => {
      acc[key] = '';
      return acc;
    },
    {}
  );

  // using values object keys calculate for each key sum from all foods -> servings
  Object.keys(values).forEach((key) => {
    const sum = foodCtx.foods.reduce((food_sum, food) => {
      const serving_sum = food.servings.serving.reduce(
        (serving_sum, serving) => {
          const serving_val = serving[key as keyof FatsecretServingValues];
          return (
            serving_sum +
            (serving_val
              ? parseFloat(serving_val) * (serving.quantity || 1)
              : 0)
          );
        },
        0
      );
      return food_sum + serving_sum;
    }, 0);

    values[key as keyof FatsecretServingValues] = sum.toFixed(2);
  });

  return (
    <CardWrapper
      label="Nutrition Summary"
      labelIcon={NotebookTextIcon}
      gridClasses="lg:row-span-2 lg:col-span-4"
    >
      <ScrollArea type='always'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(values).map(([key, val]) => {
            return (
              <p key={key}>
                <span className="font-bold">{transformKeyToString(key)}: </span>
                <span className="text-bold-muted">
                  {val}
                  {servingValuesUnits[key as keyof FatsecretServingValues]}
                </span>
              </p>
            );
          })}
        </div>
      </ScrollArea>
    </CardWrapper>
  );
}
