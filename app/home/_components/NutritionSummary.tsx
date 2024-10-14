import { useFoodContext } from '@/context/FoodContext';


export default function NutritionSummary() {
  const foodCtx = useFoodContext();
  const totalCalories = foodCtx.foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foodCtx.foods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = foodCtx.foods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = foodCtx.foods.reduce((sum, food) => sum + food.fat, 0);

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
