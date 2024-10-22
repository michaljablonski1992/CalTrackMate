'use client';

import FoodSearch from './_components/FoodSearch/FoodSearch';
import DailyLog from './_components/DailyLog';
import NutritionSummary from './_components/NutritionSummary';
import { FoodProvider } from '@/context/FoodContext';

export default function Home() {
  return (
    <FoodProvider>
      <div className="lg:container mx-auto py-8 lg:h-full">
        <div className="grid gap-3 lg:grid-rows-4 lg:grid-cols-6 lg:grid-flow-col px-2 py-2 lg:gap-4 lg:px-4 lg:py-4 leading-10 h-full">
          <FoodSearch />
          <DailyLog />
          <NutritionSummary />
        </div>
      </div>
    </FoodProvider>
  );
}
