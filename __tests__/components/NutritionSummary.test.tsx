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

describe('NutritionSummary Component', () => {
  it('should correctly calculate and display totals for calories, protein, carbs, and fat', () => {
    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: mockAddedFoodsData,
    });

    // Render the NutritionSummary component
    render(<NutritionSummary />);

    // Assert that the totals are calculated for a food list
    expect(screen.getByText('Calories: 318.00')).toBeInTheDocument(); // (100 * 3) + (1 * 10) + (4 * 2)
    expect(screen.getByText('Carbohydrate: 63.33')).toBeInTheDocument();  // (1.11 * 3) + (2 * 10) + (20 * 2)
    expect(screen.getByText('Protein: 96.00')).toBeInTheDocument();  // (2 * 3) + (3 * 10) + (30 * 2)
    expect(screen.getByText('Fat: 129.00')).toBeInTheDocument();  // (3 * 3) + (4 * 10) + (40 * 2)
    expect(screen.getByText('Saturated Fat: 165.00')).toBeInTheDocument();  // (5 * 3) + (5 * 10) + (50 * 2)
    expect(screen.getByText('Polyunsaturated Fat: 225.00')).toBeInTheDocument();  // (15 * 3) + (6 * 10) + (60 * 2)
    expect(screen.getByText('Monounsaturated Fat: 287.31')).toBeInTheDocument();  // (25.77 * 3) + (7 * 10) + (70 * 2)
    expect(screen.getByText('Cholesterol: 405.00')).toBeInTheDocument();  // (55 * 3) + (8 * 10) + (80 * 2)
    expect(screen.getByText('Sodium: 303.00')).toBeInTheDocument();  // (11 * 3) + (9 * 10) + (90 * 2)
    expect(screen.getByText('Potassium: 336.36')).toBeInTheDocument();  // (12.12 * 3) + (10 * 10) + (100 * 2)
    expect(screen.getByText('Fiber: 369.00')).toBeInTheDocument();  // (13 * 3) + (11 * 10) + (110 * 2)
    expect(screen.getByText('Sugar: 402.00')).toBeInTheDocument();  // (14 * 3) + (12 * 10) + (120 * 2)
    expect(screen.getByText('Vitamin D: 435.00')).toBeInTheDocument();  // (15 * 3) + (13 * 10) + (130 * 2)
    expect(screen.getByText('Vitamin A: 468.00')).toBeInTheDocument();  // (16 * 3) + (14 * 10) + (140 * 2)
    expect(screen.getByText('Vitamin C: 501.00')).toBeInTheDocument();  // (17 * 3) + (15 * 10) + (150 * 2)
    expect(screen.getByText('Calcium: 534.00')).toBeInTheDocument();  // (18 * 3) + (16 * 10) + (160 * 2)
    expect(screen.getByText('Iron: 567.00')).toBeInTheDocument();  // (19 * 3) + (17 * 10) + (170 * 2)
  });

  it('should display 0 for all totals when no foods are present', () => {
    // Mock the return value of useFoodContext to provide an empty foods array
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: [],
    });

    // Render the NutritionSummary component
    render(<NutritionSummary />);


    // Assert that the totals are 0 for an empty food list
    expect(screen.getByText('Calories: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Carbohydrate: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Protein: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Fat: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Saturated Fat: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Polyunsaturated Fat: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Monounsaturated Fat: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Cholesterol: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Sodium: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Potassium: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Fiber: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Sugar: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Vitamin D: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Vitamin A: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Vitamin C: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Calcium: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Iron: 0.00')).toBeInTheDocument();
  });
});
