import {
  FatsecretFood,
  FatsecretServing,
  foodDisplayName,
} from '@/lib/fatsecret/api';
import DailyLogRemoveIcon from './DailyLogRemoveIcon';

interface Props {
  food: FatsecretFood;
  removeRecordClickHandler: (
    food: FatsecretFood,
    serving?: FatsecretServing
  ) => void;
}

const DailyLogFood = ({ food, removeRecordClickHandler }: Props) => {
  return (
    <li className="mb-2 items-center">
      <span className="flex gap-2">
        <span className="font-bold">{foodDisplayName(food)}</span>{' '}
        <DailyLogRemoveIcon
          ariaLabel="Remove food"
          className="w-5 h-5 mb-2"
          onClickHandler={() => removeRecordClickHandler(food)}
        />
      </span>
      <ul className="leading-6">
        {food.servings.serving.map((serving) => {
          return (
            <DailyLogServing
              key={serving.serving_id}
              food={food}
              serving={serving}
              removeRecordClickHandler={removeRecordClickHandler}
            />
          );
        })}
      </ul>
    </li>
  );
};

interface ServingProps {
  food: FatsecretFood;
  serving: FatsecretServing;
  removeRecordClickHandler: (
    food: FatsecretFood,
    serving?: FatsecretServing
  ) => void;
}
const DailyLogServing = ({
  food,
  serving,
  removeRecordClickHandler,
}: ServingProps) => {
  return (
    <li className="ml-2 flex gap-2">
      -{' '}
      <span className="font-bold text-bold-muted">
        {serving.serving_description} x {serving.quantity}
      </span>
      <DailyLogRemoveIcon
        ariaLabel="Remove serving"
        className="w-4 h-4 mb-1"
        onClickHandler={() => removeRecordClickHandler(food, serving)}
      />
    </li>
  );
};

export default DailyLogFood;
