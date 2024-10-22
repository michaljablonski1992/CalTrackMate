// __tests__/NutritionSummary.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NutritionSummary from '@/app/home/_components/NutritionSummary';
import { useFoodContext } from '@/context/FoodContext';
import { mockAddedFoodsData } from '@/__tests__/mocks/_mockFoodData';

// Mock the useFoodContext hook
jest.mock('@/context/FoodContext', () => ({
  useFoodContext: jest.fn(),
}));

// helpers
function expectNutrition(nutritionText: string, value: string) {
  const paragraphElement = screen.getByText(`${nutritionText}:`).closest('p');
  expect(paragraphElement).toHaveTextContent(`${nutritionText}: ${value}`);
}

describe('NutritionSummary Component', () => {
  it('should correctly calculate and display totals for calories, protein, carbs, and fat', () => {
    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: mockAddedFoodsData,
    });

    // Render the NutritionSummary component
    render(<NutritionSummary />);

    // Assert that the totals are calculated for a food list
    expectNutrition('Calories', '318.00kcal'); // (100 * 3) + (1 * 10) + (4 * 2)
    expectNutrition('Carbohydrate', '63.33g'); // (1.11 * 3) + (2 * 10) + (20 * 2)
    expectNutrition('Protein', '96.00g'); // (2 * 3) + (3 * 10) + (30 * 2)
    expectNutrition('Fat', '129.00g'); // (3 * 3) + (4 * 10) + (40 * 2)
    expectNutrition('Saturated Fat', '165.00g'); // (5 * 3) + (5 * 10) + (50 * 2)
    expectNutrition('Polyunsaturated Fat', '225.00g'); // (15 * 3) + (6 * 10) + (60 * 2)
    expectNutrition('Monounsaturated Fat', '287.31g'); // (25.77 * 3) + (7 * 10) + (70 * 2)
    expectNutrition('Trans Fat', '0.24g'); // (0 * 3) + (0 * 10) + (0.12 * 2)
    expectNutrition('Cholesterol', '405.00mg'); // (55 * 3) + (8 * 10) + (80 * 2)
    expectNutrition('Sodium', '303.00mg'); // (11 * 3) + (9 * 10) + (90 * 2)
    expectNutrition('Potassium', '336.36mg'); // (12.12 * 3) + (10 * 10) + (100 * 2)
    expectNutrition('Fiber', '369.00g'); // (13 * 3) + (11 * 10) + (110 * 2)
    expectNutrition('Sugar', '402.00g'); // (14 * 3) + (12 * 10) + (120 * 2)
    expectNutrition('Added Sugars', '0.26g'); // (0 * 3) + (0 * 10) + (0.13 * 2)
    expectNutrition('Vitamin D', '435.00mg'); // (15 * 3) + (13 * 10) + (130 * 2)
    expectNutrition('Vitamin A', '468.00µg'); // (16 * 3) + (14 * 10) + (140 * 2)
    expectNutrition('Vitamin C', '501.00mg'); // (17 * 3) + (15 * 10) + (150 * 2)
    expectNutrition('Calcium', '534.00mg'); // (18 * 3) + (16 * 10) + (160 * 2)
    expectNutrition('Iron', '567.00mg'); // (19 * 3) + (17 * 10) + (170 * 2)
  });

  it('should display 0 for all totals when no foods are present', () => {
    // Mock the return value of useFoodContext to provide an empty foods array
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: [],
    });

    // Render the NutritionSummary component
    render(<NutritionSummary />);

    // Assert that the totals are 0 for an empty food list
    expectNutrition('Calories', '0.00kcal');
    expectNutrition('Carbohydrate', '0.00g');
    expectNutrition('Protein', '0.00g');
    expectNutrition('Fat', '0.00g');
    expectNutrition('Saturated Fat', '0.00g');
    expectNutrition('Polyunsaturated Fat', '0.00g');
    expectNutrition('Monounsaturated Fat', '0.00g');
    expectNutrition('Trans Fat', '0.00g');
    expectNutrition('Cholesterol', '0.00mg');
    expectNutrition('Sodium', '0.00mg');
    expectNutrition('Potassium', '0.00mg');
    expectNutrition('Fiber', '0.00g');
    expectNutrition('Sugar', '0.00g');
    expectNutrition('Added Sugars', '0.00g');
    expectNutrition('Vitamin D', '0.00mg');
    expectNutrition('Vitamin A', '0.00µg');
    expectNutrition('Vitamin C', '0.00mg');
    expectNutrition('Calcium', '0.00mg');
    expectNutrition('Iron', '0.00mg');
  });
});
