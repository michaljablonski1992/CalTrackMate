import { render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FoodProvider, useFoodContext } from '@/context/FoodContext';
import { FatsecretFood, FatsecretFoodType } from '@/lib/fatsecret/api';
import { act } from 'react';


// A simple test component that uses the FoodContext
const TestComponent = () => {
  const { foods } = useFoodContext();
  return <div>Number: {foods.length}</div>;
};

// wrapper for context and context itself
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FoodProvider>{children}</FoodProvider>
);


//// TESTS
test('useFoodContext throws an error if used outside of FoodProvider', () => {
  try {
    render(<TestComponent />);
  }
  catch(error: any){
    expect(error.message).toBe('useFoodContext must be used within a FoodProvider')
  }
});
test("useFoodContext doesn't throw an error if used inside of FoodProvider", () => {
  render(
    <FoodProvider>
      <TestComponent />
    </FoodProvider>
  );
  expect(screen.getByText('Number: 0')).toBeInTheDocument();
});

test("transformFoodData transform data for different description", () => {
  const { result } = renderHook(() => useFoodContext(), { wrapper });
  const context = result.current;

  const descriptionsToTest = [
    'Whole Milk - Per 100 g - Calories: 60kcal | Fat: 3.25g | Carbs: 4.52g | Protein: 3.22g',
    'Teriyaki Chicken (4 oz) - Per 4 oz - Calories: 150kcal | Fat: 8.00g | Carbs: 0.00g | Protein: 19.00g',
    'Vitamin D Whole Milk - Per 8 fl oz - Calories: 150kcal | Fat: 8.00g | Carbs: 12.00g | Protein: 8.00g',
    'Whole Milk - Per 1 cup - Calories: 160kcal | Fat: 8.00g | Carbs: 12.00g | Protein: 8.00g',
    'Snickers Bar (1.86 oz) - Per 1 bar - Calories: 250kcal | Fat: 12.00g | Carbs: 32.00g | Protein: 4.00g',
    'Snickers Bar (Miniatures) - Per 3 pieces - Calories: 130kcal | Fat: 6.00g | Carbs: 17.00g | Protein: 2.00g',
    'Coca-Cola Classic (10 oz) - Per 1 bottle - Calories: 120kcal | Fat: 0.00g | Carbs: 33.00g | Protein: 0.00g',
    'Coca-Cola Classic (7.5 oz) - Per 1 can - Calories: 90kcal | Fat: 0.00g | Carbs: 25.00g | Protein: 0.00g',
    'Whole Milk - Per 100g - Calories: 60kcal | Fat: 3.25g | Carbs: 4.52g | Protein: 3.22g',
    'Teriyaki Chicken (4 oz) - Per 4oz - Calories: 150kcal | Fat: 8.00g | Carbs: 0.00g | Protein: 19.00g',
    'Vitamin D Whole Milk - Per 8fl oz - Calories: 150kcal | Fat: 8.00g | Carbs: 12.00g | Protein: 8.00g',
    'Whole Milk - Per 1cup - Calories: 160kcal | Fat: 8.00g | Carbs: 12.00g | Protein: 8.00g',
    'Snickers Bar (1.86 oz) - Per 1bar - Calories: 250kcal | Fat: 12.00g | Carbs: 32.00g | Protein: 4.00g',
    'Snickers Bar (Miniatures) - Per 3pieces - Calories: 130kcal | Fat: 6.00g | Carbs: 17.00g | Protein: 2.00g',
    'Coca-Cola Classic (10 oz) - Per 1bottle - Calories: 120kcal | Fat: 0.00g | Carbs: 33.00g | Protein: 0.00g',
    'Coca-Cola Classic (7.5 oz) - Per 1can - Calories: 90kcal | Fat: 0.00g | Carbs: 25.00g | Protein: 0.00g'
  ]
  const foods = descriptionsToTest.map((desc, idx) => {
    return {
      food_id: idx.toString(),
      food_name: `Food ${idx}`,
      food_type: FatsecretFoodType.Generic,
      food_url: `food_url_${idx}`,
      food_description: desc
    }
  })
  const foodsWithData = foods.map((food) => {
    return context?.transformFoodData(food);
  })
  const expectedVals = [
    { calories: 60, fat: 3.25, carbs: 4.52, protein: 3.22, metricValue: 100, metricUnit: 'g' },
    { calories: 150, fat: 8.00, carbs: 0.00, protein: 19.00, metricValue: 4, metricUnit: 'oz' },
    { calories: 150, fat: 8.00, carbs: 12.00, protein: 8.00, metricValue: 8, metricUnit: 'fl oz' },
    { calories: 160, fat: 8.00, carbs: 12.00, protein: 8.00, metricValue: 1, metricUnit: 'cup' },
    { calories: 250, fat: 12.00, carbs: 32.00, protein: 4.00, metricValue: 1, metricUnit: 'bar' },
    { calories: 130, fat: 6.00, carbs: 17.00, protein: 2.00, metricValue: 3, metricUnit: 'pieces' },
    { calories: 120, fat: 0.00, carbs: 33.00, protein: 0.00, metricValue: 1, metricUnit: 'bottle' },
    { calories: 90, fat: 0.00, carbs: 25.00, protein: 0.00, metricValue: 1, metricUnit: 'can' },
    { calories: 60, fat: 3.25, carbs: 4.52, protein: 3.22, metricValue: 100, metricUnit: 'g' },
    { calories: 150, fat: 8.00, carbs: 0.00, protein: 19.00, metricValue: 4, metricUnit: 'oz' },
    { calories: 150, fat: 8.00, carbs: 12.00, protein: 8.00, metricValue: 8, metricUnit: 'fl oz' },
    { calories: 160, fat: 8.00, carbs: 12.00, protein: 8.00, metricValue: 1, metricUnit: 'cup' },
    { calories: 250, fat: 12.00, carbs: 32.00, protein: 4.00, metricValue: 1, metricUnit: 'bar' },
    { calories: 130, fat: 6.00, carbs: 17.00, protein: 2.00, metricValue: 3, metricUnit: 'pieces' },
    { calories: 120, fat: 0.00, carbs: 33.00, protein: 0.00, metricValue: 1, metricUnit: 'bottle' },
    { calories: 90, fat: 0.00, carbs: 25.00, protein: 0.00, metricValue: 1, metricUnit: 'can' },
  ]

  expectedVals.forEach((exp, idx) => {
    const food = foodsWithData[idx];
    expect(exp.calories).toBe(food.calories);
    expect(exp.fat).toBe(food.fat);
    expect(exp.carbs).toBe(food.carbs);
    expect(exp.protein).toBe(food.protein);
    expect(exp.metricValue).toBe(food.metricValue);
    expect(exp.metricUnit).toBe(food.metricUnit);
  })
})

test("addFood transform data and add food to foods", () => {
  const { result } = renderHook(() => useFoodContext(), { wrapper });

  // empty initially
  expect(result.current.foods.length).toBe(0);

  // mock food
  const mockFood: FatsecretFood = {
    food_id: '1',
    food_name: 'Food 1',
    food_type: FatsecretFoodType.Generic,
    food_url: 'food_url_1',
    food_description: 'Whole Milk - Per 100 g - Calories: 60kcal | Fat: 3.25g | Carbs: 4.52g | Protein: 3.22g',
  };

  // add to foods
  act(() => {
    result.current.addFood(mockFood);
  });

  // expect added with data extracted
  expect(result.current.foods.length).toBe(1);
  expect(result.current.foods).toEqual([{
    calories: 60,
    carbs: 4.52,
    fat: 3.25,
    food_description: "Whole Milk - Per 100 g - Calories: 60kcal | Fat: 3.25g | Carbs: 4.52g | Protein: 3.22g",
    food_id: "1",
    food_name: "Food 1",
    food_type: "Generic",
    food_url: "food_url_1",
    metricUnit: "g",
    metricValue: 100,
    protein: 3.22,
  }]);
})