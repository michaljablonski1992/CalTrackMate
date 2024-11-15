import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FatsecretFood, FatsecretServing } from '@/lib/fatsecret/api';
import DailyLogRemoveIcon from './DailyLogRemoveIcon';
import { Fragment } from 'react';
import ServingQtyInput, {
  MODS as QTY_INPUT_MODS,
} from '../shared/ServingQtyInput';
import { useFoodContext } from '@/context/FoodContext';

interface Props {
  removeRecordClickHandler: (
    food: FatsecretFood,
    serving?: FatsecretServing
  ) => void;
}

const DailyLogTable = ({ removeRecordClickHandler }: Props) => {
  const foodCtx = useFoodContext();

  return (
    <Table aria-label="Foods table">
      <TableHeader>
        <TableRow>
          <TableHead className='lg:w-96'>Name</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead className='lg:w-48'>Quantity</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foodCtx.foods.map((food) => (
          <Fragment key={food.food_id}>
            <TableRow>
              <TableCell className="font-semibold">{food.food_name}</TableCell>
              <TableCell className="font-semibold">{food.brand_name}</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right lg:pr-6">
                <DailyLogRemoveIcon
                  ariaLabel="Remove food"
                  className="w-6 h-6"
                  onClickHandler={() => removeRecordClickHandler(food)}
                />
              </TableCell>
            </TableRow>
            {food.servings.serving.map((serving) => {
              return (
                <TableRow key={serving.serving_id}>
                  <TableCell className="font-medium lg:pl-12 pl-7">
                    {serving.serving_description}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <ServingQtyInput
                      food={food}
                      serving={serving}
                      mode={QTY_INPUT_MODS.EDIT}
                    />
                  </TableCell>
                  <TableCell className="text-right lg:pr-6">
                    <DailyLogRemoveIcon
                      ariaLabel="Remove serving"
                      className="w-6 h-6"
                      onClickHandler={() =>
                        removeRecordClickHandler(food, serving)
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default DailyLogTable;
