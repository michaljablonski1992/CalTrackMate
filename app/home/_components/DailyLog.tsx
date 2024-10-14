import { useFoodContext } from '@/context/FoodContext';

export default function DailyLog() {
  const foodCtx = useFoodContext();

  return (
    <ul>
      {foodCtx.foods.map((food, index) => (
        <li key={index} className="mb-2">
          {food.name} - {food.calories} cal
        </li>
      ))}
    </ul>
  );
}
