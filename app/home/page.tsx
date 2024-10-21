'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FoodSearch from './_components/FoodSearch/FoodSearch';
import DailyLog from './_components/DailyLog';
import NutritionSummary from './_components/NutritionSummary';
import { FoodProvider } from '@/context/FoodContext';
import { FileClockIcon, NotebookTextIcon } from 'lucide-react';

export default function Home() {
  return (
    <FoodProvider>
      <div className="lg:container mx-auto py-8 lg:h-full">
        <div className="grid gap-3 lg:grid-rows-4 lg:grid-cols-6 lg:grid-flow-col px-2 py-2 lg:gap-4 lg:px-4 lg:py-4 leading-10 h-full">
          <FoodSearch />

          <Card className="w-full rounded-xl lg:col-span-4 lg:row-span-2">
            <CardHeader>
              <CardTitle className="text-primary">
                <div className="flex items-center gap-2">
                  <FileClockIcon className="size-5" />
                  Daily Log
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DailyLog />
            </CardContent>
          </Card>

          <Card className="w-full rounded-xl lg:row-span-2 lg:col-span-4">
            <CardHeader>
            <CardTitle className="text-primary">
                <div className="flex items-center gap-2">
                  <NotebookTextIcon className="size-5" />
                  Nutrition Summary
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NutritionSummary />
            </CardContent>
          </Card>
        </div>
      </div>
    </FoodProvider>
  );
}
