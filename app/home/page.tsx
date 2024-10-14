'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FoodSearch from './_components/FoodSearch';
import DailyLog from './_components/DailyLog';
import NutritionSummary from './_components/NutritionSummary';
import { FoodProvider } from '@/context/FoodContext';

export default function Home() {
  return (
    <FoodProvider>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Food</CardTitle>
            </CardHeader>
            <CardContent>
              <FoodSearch />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nutrition Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <NutritionSummary />
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Daily Log</CardTitle>
          </CardHeader>
          <CardContent>
            <DailyLog />
          </CardContent>
        </Card>
      </div>
    </FoodProvider>
  );
}
