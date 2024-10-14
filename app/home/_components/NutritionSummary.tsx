import { Food } from '@/lib/api';

interface NutritionSummaryProps {
  foods: Food[];
}

export default function NutritionSummary({ foods }: NutritionSummaryProps) {
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = foods.reduce((sum, food) => sum + food.fat, 0);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Daily Totals</h3>
      <p>Calories: {totalCalories.toFixed(1)}</p>
      <p>Protein: {totalProtein.toFixed(1)}g</p>
      <p>Carbs: {totalCarbs.toFixed(1)}g</p>
      <p>Fat: {totalFat.toFixed(1)}g</p>
    </div>
  );
}
