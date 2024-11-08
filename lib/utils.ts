import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FatsecretFood } from './fatsecret/api';
import { FatsecretFoodData } from '@/convex/food';
import {
  FatsecretServingValues,
  servingValuesUnits,
} from '@/lib/fatsecret/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformKeyToString(key: string): string {
  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function roundTo(num: number, decimals: number) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function humanDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getCurrentDate() {
  return localStorage.getItem('currentDate') || getTodayDate();
}

export function getTodayDate() {
  return datetimeToDate(new Date());
}

export function datetimeToDate(datetime: Date) {
  const year = datetime.getFullYear();
  const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(datetime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function dateToDatetime(date: string) {
  return new Date(date);
}

export function getNutritionValues(
  foods: FatsecretFood[] | FatsecretFoodData[],
  withUnits?: boolean
) {
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
    const sum = foods.reduce((food_sum, food) => {
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

    let sumStr = sum.toFixed(2)
    if(withUnits) {
      sumStr += servingValuesUnits[key as keyof FatsecretServingValues]
    }
    values[key as keyof FatsecretServingValues] = sumStr;
  });

  return values;
}
