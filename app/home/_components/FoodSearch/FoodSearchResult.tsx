import { FatsecretFood, FatsecretServing } from '@/lib/fatsecret/api';
import CollapsibleWrapper from '@/components/shared/CollapsibleWrapper';
import { foodDisplayName } from '@/lib/fatsecret/api';
import ServingQtyInput from '../shared/ServingQtyInput';

interface Props {
  food: FatsecretFood;
}
const FoodSearchResult = ({ food }: Props) => {
  return (
    <li className="mb-2 mr-1">
      <CollapsibleWrapper
        trigger={
          <div className="font-bold text-left">{foodDisplayName(food)}</div>
        }
      >
        <div className="pt-1">
          <ul>
            {food.servings.serving.map((serving) => {
              return (
                <FoodSearchResultServing
                  key={serving.serving_id}
                  food={food}
                  serving={serving}
                />
              );
            })}
          </ul>
        </div>
      </CollapsibleWrapper>
    </li>
  );
};

interface FoodSearchResultServingProps {
  food: FatsecretFood;
  serving: FatsecretServing;
}
const FoodSearchResultServing = ({
  food,
  serving,
}: FoodSearchResultServingProps) => {
  return (
    <li className="ml-6 mb-2 flex justify-between items-center">
      <span className="text-bold-muted">{serving.serving_description}</span>
      <div className="flex justify-end gap-4">
        <span className="flex gap-2">
          x
          <ServingQtyInput food={food} serving={serving} />
        </span>
      </div>
    </li>
  );
};

export default FoodSearchResult;
