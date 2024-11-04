import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FoodProvider, useFoodContext } from '@/context/FoodContext';
import { FatsecretFoodType } from '@/lib/fatsecret/api';
import { act } from 'react';
import { mockFoodData } from '@/__tests__/mocks/_mockFoodData';
import QueryClientProviderWrapper from '@/providers/QueryClientProviderWrapper';
import { convexClient } from '@/providers/ConvexClientProvider';


// Mock the Convex client and set up a dummy CONVEX_URL
jest.mock('@/providers/ConvexClientProvider', () => ({
  convexClient: {
    mutation: jest.fn(),
  },
}));
beforeEach(() => {
  (convexClient.mutation as jest.Mock).mockReturnValue([]);
});


// wrapper for context and context itself
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProviderWrapper><FoodProvider>{children}</FoodProvider></QueryClientProviderWrapper>
);

//// TESTS
test('addFood transform data and add food to foods', () => {
  const { result } = renderHook(() => useFoodContext(), { wrapper });

  // empty initially
  expect(result.current.foods.length).toBe(0);

  // get foods and servings to add
  const mockFood1 = mockFoodData.find(
    (d) => d.food_name === '2% Reduced Fat Milk'
  );
  const mockServing1 = mockFood1?.servings.serving.find(
    (d) => d.serving_description === '1 cup'
  );
  const mockFood2 = mockFoodData.find((d) => d.food_name === 'Butter');
  const mockServing2 = mockFood2?.servings.serving.find(
    (d) => d.serving_description === '100 g'
  );
  const mockServing3 = mockFood2?.servings.serving.find(
    (d) => d.serving_description === '1 tbsp'
  );

  // add first serving of first food to foods
  act(() => {
    result.current.addFood(mockFood1!, mockServing1!, 1);
  });

  // prepare expected data
  const food1serving1 = {
    serving_id: '130538',
    serving_description: '1 cup',
    serving_url:
      'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
    metric_serving_amount: '236.000',
    metric_serving_unit: 'g',
    number_of_units: '1.000',
    measurement_description: 'serving',
    calories: '120',
    carbohydrate: '12.00',
    protein: '8.00',
    fat: '5.00',
    saturated_fat: '3.000',
    cholesterol: '20',
    sodium: '130',
    fiber: '0',
    sugar: '12.00',
    quantity: 1,
  };
  const food1servings = {
    serving: [food1serving1],
  };
  const food1 = {
    food_id: '86784',
    food_name: '2% Reduced Fat Milk',
    brand_name: 'Southern Home',
    food_type: FatsecretFoodType.Brand,
    food_url:
      'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
    servings: food1servings,
  };

  // expect food1 added with serving1
  expect(result.current.foods.length).toBe(1);
  expect(result.current.foods).toEqual([food1]);

  // add the same food to foods but with different quantity
  act(() => {
    result.current.addFood(mockFood1!, mockServing1!, 1.5);
  });

  // expect food1 added with 2x serving1 added
  food1serving1.quantity = 2.5;
  expect(result.current.foods.length).toBe(1);
  expect(result.current.foods).toEqual([food1]);

  // now add another food with serving
  // add first serving of second food to foods
  act(() => {
    result.current.addFood(mockFood2!, mockServing2!, 1);
  });

  // prepare expected data
  const food2serving1 = {
    serving_id: '56545',
    serving_description: '100 g',
    serving_url:
      'https://www.fatsecret.com/calories-nutrition/usda/butter?portionid=56545&portionamount=100.000',
    metric_serving_amount: '100.000',
    metric_serving_unit: 'g',
    number_of_units: '100.000',
    measurement_description: 'g',
    calories: '717',
    carbohydrate: '0.06',
    protein: '0.85',
    fat: '81.11',
    saturated_fat: '51.368',
    polyunsaturated_fat: '3.043',
    monounsaturated_fat: '21.021',
    cholesterol: '215',
    sodium: '11',
    potassium: '24',
    fiber: '0',
    sugar: '0.06',
    vitamin_a: '684',
    vitamin_c: '0',
    calcium: '24',
    iron: '0.02',
    quantity: 1,
  };
  const food2servings = {
    serving: [food2serving1],
  };
  const food2 = {
    food_id: '33814',
    food_name: 'Butter',
    food_type: FatsecretFoodType.Generic,
    food_url: 'https://www.fatsecret.com/calories-nutrition/usda/butter',
    servings: food2servings,
  };

  // expect food2 added with serving1
  expect(result.current.foods.length).toBe(2);
  expect(result.current.foods).toEqual([food1, food2]);

  // now add another serving for food2 but with different quantity
  act(() => {
    result.current.addFood(mockFood2!, mockServing3!, 3.85);
  });

  // prepare expected data
  const food2serving2 = {
    serving_id: '29479',
    serving_description: '1 tbsp',
    serving_url:
      'https://www.fatsecret.com/calories-nutrition/usda/butter?portionid=29479&portionamount=1.000',
    metric_serving_amount: '14.200',
    metric_serving_unit: 'g',
    number_of_units: '1.000',
    measurement_description: 'tbsp',
    calories: '102',
    carbohydrate: '0.01',
    protein: '0.12',
    fat: '11.52',
    saturated_fat: '7.294',
    polyunsaturated_fat: '0.432',
    monounsaturated_fat: '2.985',
    trans_fat: "0.12",
    cholesterol: '31',
    sodium: '2',
    potassium: '3',
    fiber: '0',
    sugar: '0.01',
    added_sugars: "0.13",
    vitamin_a: '97',
    vitamin_c: '0.0',
    calcium: '3',
    iron: '0.00',
    quantity: 3.85
  };
  food2.servings.serving.push(food2serving2)

  // expect food2 added with serving1 and serving2
  expect(result.current.foods.length).toBe(2);
  expect(result.current.foods).toEqual([food1, food2]);
});
