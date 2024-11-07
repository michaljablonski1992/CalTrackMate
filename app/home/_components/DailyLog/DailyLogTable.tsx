import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FatsecretFood,
  FatsecretServing,
} from '@/lib/fatsecret/api';
import DailyLogRemoveIcon from './DailyLogRemoveIcon';
import DailyLogServingEditIcon from './DailyLogServingEditIcon';
import { Fragment } from 'react';

interface Props {
  foods: FatsecretFood[];
  removeRecordClickHandler: (
    food: FatsecretFood,
    serving?: FatsecretServing
  ) => void;
}

const DailyLogTable = ({ foods, removeRecordClickHandler }: Props) => {
  return (
    <Table aria-label='Foods table'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-96'>Name</TableHead>
          <TableHead className='w-96'>Brand</TableHead>
          <TableHead className='text-center'>Quantity</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foods.map((food) => (
          <Fragment key={food.food_id}>
            <TableRow>
              <TableCell className="font-semibold">
                {food.food_name}
              </TableCell>
              <TableCell className="font-semibold">
                {food.brand_name}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
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
                  <TableCell className="font-medium pl-16">
                    {serving.serving_description}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className='text-center'>{serving.quantity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <DailyLogServingEditIcon
                        className="w-6 h-6"
                        onClickHandler={() => {
                          console.log('will edit');
                        }}
                      />
                      <DailyLogRemoveIcon
                        ariaLabel="Remove serving"
                        className="w-6 h-6"
                        onClickHandler={() =>
                          removeRecordClickHandler(food, serving)
                        }
                      />
                    </div>
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
