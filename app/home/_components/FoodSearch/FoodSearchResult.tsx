import { FatsecretFood } from '@/lib/fatsecret/api';
import { useFoodContext } from '@/context/FoodContext';
import CollapsibleWrapper from '@/components/shared/CollapsibleWrapper';
import TooltipWrapper from '@/components/shared/TooltipWrapper';
import { BadgePlusIcon } from 'lucide-react';
import { foodDisplayName } from '@/lib/fatsecret/api';

interface Props {
  food: FatsecretFood;
}
const FoodSearchResult = ({ food }: Props) => {
  const foodCtx = useFoodContext();

  return (
    <li className="mb-2 mr-1">
      <CollapsibleWrapper
        trigger={<div className="font-bold text-left">{foodDisplayName(food)}</div>}
      >
        <div>
          <ul>
            {food.servings.serving.map((serving) => {
              return (
                <li
                  key={serving.serving_id}
                  className="ml-6 mb-2 flex justify-between items-center text-bold-muted"
                >
                  {serving.serving_description}
                  <TooltipWrapper
                    trigger={
                      <button
                        aria-label="Add serving"
                        onClick={() => foodCtx.addFood(food, serving)}
                      >
                        <BadgePlusIcon className="hover:cursor-pointer text-primary" />
                      </button>
                    }
                  >
                    Add serving
                  </TooltipWrapper>
                </li>
              );
            })}
          </ul>
        </div>
      </CollapsibleWrapper>
    </li>
  );
};

export default FoodSearchResult;
