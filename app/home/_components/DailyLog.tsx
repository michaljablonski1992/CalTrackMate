import { useFoodContext } from '@/context/FoodContext';
import { foodDisplayName } from '@/lib/utils';

export default function DailyLog() {
  const foodCtx = useFoodContext();

  return (
    <ul className="list-disc ml-5">
      {foodCtx.foods.map((food, index) => (
        <li key={index} className="mb-2 items-center">
          <span className="font-bold">{foodDisplayName(food)}</span>
          <ul className='leading-6'>
            {food.servings.serving.map((serving) => {
              return (
                <li key={serving.serving_id} className="ml-2">- {serving.serving_description} x {serving.quantity}</li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
