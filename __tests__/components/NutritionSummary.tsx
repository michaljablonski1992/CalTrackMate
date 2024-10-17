// __tests__/NutritionSummary.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NutritionSummary from '@/app/home/_components/NutritionSummary';
import { useFoodContext } from '@/context/FoodContext';

// Mock the useFoodContext hook
jest.mock('@/context/FoodContext', () => ({
  useFoodContext: jest.fn(),
}));

describe('NutritionSummary Component', () => {
  it('should correctly calculate and display totals for calories, protein, carbs, and fat', () => {
    // Mock data for foods in the context
    const mockFoods = [
      {
        food_id: '1',
        food_name: 'Apple',
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
      },
      {
        food_id: '2',
        food_name: 'Banana',
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3,
      },
    ];

    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: mockFoods,
    });

    // Render the NutritionSummary component
    render(<NutritionSummary />);

    // Assert that the totals are correctly calculated and displayed
    expect(screen.getByText('Calories: 141.0kcal')).toBeInTheDocument(); // 52 + 89
    expect(screen.getByText('Protein: 1.4g')).toBeInTheDocument(); // 0.3 + 1.1
    expect(screen.getByText('Carbs: 37.0g')).toBeInTheDocument(); // 14 + 23
    expect(screen.getByText('Fat: 0.5g')).toBeInTheDocument(); // 0.2 + 0.3
  });

  it('should display 0 for all totals when no foods are present', () => {
    // Mock the return value of useFoodContext to provide an empty foods array
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: [],
    });

    // Render the NutritionSummary component
    render(<NutritionSummary />);

    // Assert that the totals are 0 for an empty food list
    expect(screen.getByText('Calories: 0.0kcal')).toBeInTheDocument();
    expect(screen.getByText('Protein: 0.0g')).toBeInTheDocument();
    expect(screen.getByText('Carbs: 0.0g')).toBeInTheDocument();
    expect(screen.getByText('Fat: 0.0g')).toBeInTheDocument();
  });
});
