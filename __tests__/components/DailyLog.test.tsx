// __tests__/components/DailyLog.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DailyLog from '@/app/home/_components/DailyLog/DailyLog'
import { useFoodContext } from '@/context/FoodContext';
import { mockAddedFoodsData } from '@/__tests__/mocks/_mockFoodData';

// Mock the useFoodContext hook
jest.mock('@/context/FoodContext', () => ({
  useFoodContext: jest.fn(),
}));

describe('DailyLog component', () => {
  it('should show message when nothing added yet', () => {
    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: [],
    });

    // Render the DailyLog component
    render(<DailyLog />);

    // Assert 'no entries text' exists
    expect(screen.getByText('There are no entries in log yet')).toBeInTheDocument();
  });
  it('should correctly show added food with servings', () => {
    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: mockAddedFoodsData,
    });

    // Render the DailyLog component
    render(<DailyLog />);

    // Assert 'no entries text' doesn't exist
    expect(screen.queryByText('There are no entries in log yet')).not.toBeInTheDocument();

    // Assert that the totals are calculated for a food list
    expect(screen.getByText('2% Reduced Fat Milk - Southern Home')).toBeInTheDocument();
    expect(screen.getByText('1 cup x 3')).toBeInTheDocument();
    expect(screen.getByText('1 tbsp x 10')).toBeInTheDocument();
    expect(screen.getByText('Butter')).toBeInTheDocument();
    expect(screen.getByText('1 tbsp x 2')).toBeInTheDocument();
  });
});
