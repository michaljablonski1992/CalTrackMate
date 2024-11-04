import FoodSearch from './_components/FoodSearch/FoodSearch';
import DailyLog from './_components/DailyLog';
import NutritionSummary from './_components/NutritionSummary';
import { FoodProvider } from '@/context/FoodContext';

export default function Home() {
  return (
    <FoodProvider>
      <div className="lg:h-full w-full">
        <div className="grid gap-3 lg:grid-rows-4 lg:grid-cols-6 lg:grid-flow-col lg:gap-4 leading-10 h-full">
          <FoodSearch />
          <DailyLog />
          <NutritionSummary />
        </div>
      </div>
    </FoodProvider>
  );
}
