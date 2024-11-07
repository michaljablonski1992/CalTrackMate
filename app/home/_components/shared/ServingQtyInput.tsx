import TooltipWrapper, {
  TooltipWrapperMods,
  TooltipWrapperSides,
  TooltipWrapperTypes,
} from '@/components/shared/TooltipWrapper';
import { Input } from '@/components/ui/input';
import { useFoodContext } from '@/context/FoodContext';
import {
  FatsecretFood,
  FatsecretServing,
  INPUT_MAX_DECIMALS,
} from '@/lib/fatsecret/api';
import { BadgePlusIcon, CircleCheckIcon, CircleXIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export enum MODS {
  ADD = 'add',
  EDIT = 'edit',
}

interface Props {
  food: FatsecretFood;
  serving: FatsecretServing;
  mode?: MODS;
}

const ServingQtyInput = ({ food, serving, mode = MODS.ADD }: Props) => {
  const foodCtx = useFoodContext();
  const initServingQuantity =
    mode === MODS.EDIT ? serving.quantity!.toString() : '1';
  const [qty, setQty] = useState<string>(initServingQuantity);
  const [qtyError, setQtyError] = useState<string>('');
  const qtyInputRef = useRef<HTMLInputElement>(null);
  const qtyChanged = qty !== initServingQuantity;

  useEffect(() => {
    setQty(mode === MODS.EDIT ? serving.quantity!.toString() : '1');
  }, [serving, mode]);

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

  const onAddFoodHandler = () => {
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

    // Validate if is not 0 or less
    if (parseFloat(qty) <= 0) {
      setQtyError('Invalid value');
      return;
    }

    // all good, add food
    foodCtx.addFood(food, serving, parseFloat(qty), mode === MODS.EDIT);
  };

  const onEditCancelHandler = () => {
    setQtyError('');
    setQty(serving.quantity!.toString());
  };

  return (
    <div className="flex gap-3">
      <TooltipWrapper
        mode={TooltipWrapperMods.Manual}
        type={TooltipWrapperTypes.Danger}
        side={
          mode === MODS.ADD
            ? TooltipWrapperSides.Right
            : TooltipWrapperSides.Top
        }
        tooltipContent={qtyError}
        open={!!qtyError}
      >
        <Input
          aria-label="Serving Quantity"
          ref={qtyInputRef}
          type="number"
          value={qty}
          onChange={onQtyChangeHandler}
          className="w-20 text-center arrows-hidden"
        />
      </TooltipWrapper>
      <div className="flex gap-2">
        <TooltipWrapper
          tooltipContent={mode === MODS.EDIT ? 'Confirm' : 'Add Serving'}
        >
          <>
            {mode === MODS.ADD && (
              <button aria-label="Add serving" onClick={onAddFoodHandler}>
                <BadgePlusIcon className="hover:cursor-pointer text-primary" />
              </button>
            )}
            {mode === MODS.EDIT && qtyChanged && (
              <button aria-label="Confirm" onClick={onAddFoodHandler}>
                <CircleCheckIcon className="hover:cursor-pointer text-primary" />
              </button>
            )}
          </>
        </TooltipWrapper>
        {mode === MODS.EDIT && qtyChanged && (
          <TooltipWrapper tooltipContent="Cancel">
            <button aria-label="Cancel" onClick={onEditCancelHandler}>
              <CircleXIcon className="hover:cursor-pointer text-destructive" />
            </button>
          </TooltipWrapper>
        )}
      </div>
    </div>
  );
};

export default ServingQtyInput;
