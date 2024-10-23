import { FatsecretFood, FatsecretServing } from '@/lib/fatsecret/api';
import { useFoodContext } from '@/context/FoodContext';
import CollapsibleWrapper from '@/components/shared/CollapsibleWrapper';
import TooltipWrapper, {
  TooltipWrapperMods,
  TooltipWrapperTypes,
} from '@/components/shared/TooltipWrapper';
import { BadgePlusIcon } from 'lucide-react';
import { foodDisplayName, INPUT_MAX_DECIMALS } from '@/lib/fatsecret/api';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';

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
  const foodCtx = useFoodContext();
  const qtyInputRef = useRef<HTMLInputElement>(null);
  const [qty, setQty] = useState<string>('1');
  const [qtyError, setQtyError] = useState<string>('');

  const onAddFoodHandler = (food: FatsecretFood, serving: FatsecretServing) => {
    // Ignore input if more than 4 digits after the decimal
    const parts = qty.toString().split('.');
    if (parts[1] && parts[1].length > INPUT_MAX_DECIMALS) {
      setQtyError('Invalid value');
      return;
    }

    // Validate if is number  
    if (isNaN(parseFloat(qty))) {
      setQtyError('Invalid value');
      return;
    }

    // all good, add food
    foodCtx.addFood(food, serving, parseFloat(qty));
  };

  const onQtyChangeHandler = () => {
    setQtyError('');
    let inputValue = qtyInputRef.current!.value;

    // Ignore input if more than 4 digits after the decimal
    const parts = inputValue.split('.');
    if (parts[1] && parts[1].length > INPUT_MAX_DECIMALS) {
      return;
    }

    // Remove leading zeros from integers (except if the user just types '0')
    if (/^0[0-9]+$/.test(inputValue) && inputValue !== '0') {
      inputValue = inputValue.replace(/^0+/, '');
      qtyInputRef.current!.value = inputValue;
    }

    // Handle empty input
    const val = inputValue === '' ? '0' : inputValue;
    setQty(val);
  };

  return (
    <li className="ml-6 mb-2 flex justify-between items-center">
      <span className="text-bold-muted">{serving.serving_description}</span>
      <div className="flex justify-end gap-4">
        <span className="flex gap-2">
          x
          <TooltipWrapper
            mode={TooltipWrapperMods.Manual}
            type={TooltipWrapperTypes.Error}
            tooltipContent={qtyError}
            open={!!qtyError}
          >
            <Input
              ref={qtyInputRef}
              type="number"
              value={qty}
              onChange={onQtyChangeHandler}
              className="w-16 text-center .arrows-hidden"
            />
          </TooltipWrapper>
        </span>
        <TooltipWrapper tooltipContent="Add serving">
          <button
            aria-label="Add serving"
            onClick={() => onAddFoodHandler(food, serving)}
          >
            <BadgePlusIcon className="hover:cursor-pointer text-primary" />
          </button>
        </TooltipWrapper>
      </div>
    </li>
  );
};

export default FoodSearchResult;
