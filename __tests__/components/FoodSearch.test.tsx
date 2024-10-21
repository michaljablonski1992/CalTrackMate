// __tests__/FoodSearch.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodSearch from '@/app/home/_components/FoodSearch/FoodSearch';
import { fetchFoodData } from '@/lib/fatsecret/api';
import { useFoodContext } from '@/context/FoodContext';
import { mockFoodData } from '@/__tests__/mocks/_mockFoodData';

// Mock the API call
jest.mock('@/lib/fatsecret/api', () => ({
  ...jest.requireActual('@/lib/fatsecret/api'),
  fetchFoodData: jest.fn(),
}));

// Mock the useFoodContext
jest.mock('@/context/FoodContext', () => ({
  ...jest.requireActual('@/context/FoodContext'),
  useFoodContext: jest.fn(),
}));

describe('FoodSearch Component', () => {
  const mockAddFood = jest.fn();

  beforeEach(() => {
    // Mock the useFoodContext implementation
    (useFoodContext as jest.Mock).mockReturnValue({
      addFood: mockAddFood,
    });

    // Mock fetchFoodData to return mock food data
    (fetchFoodData as jest.Mock).mockResolvedValue(mockFoodData);
  });

  it('should render the search input and button', () => {
    render(<FoodSearch />);

    expect(
      screen.getByPlaceholderText('Search for a food...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should search for foods and display results', async () => {
    render(<FoodSearch />);

    const input = screen.getByPlaceholderText('Search for a food...');
    const searchButton = screen.getByText('Search');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'Butter' } });
    expect(input).toHaveValue('Butter');

    // Simulate clicking the search button
    fireEvent.click(searchButton);

    // Wait for the mocked fetchFoodData call to resolve
    await waitFor(() => {
      expect(fetchFoodData).toHaveBeenCalledWith('Butter');
    });

    // Check that the search results are displayed, but collapsed
    expect(
      screen.queryByText('2% Reduced Fat Milk - Southern Home')
    ).toBeInTheDocument();
    expect(screen.queryByText('1 cup')).not.toBeInTheDocument();
    expect(screen.queryByText('Butter')).toBeInTheDocument();
    expect(screen.queryByText('1 tbsp')).not.toBeInTheDocument();
    expect(screen.queryByText('100 g')).not.toBeInTheDocument();

    // now expand and expect servings show
    await waitFor(() => {
      const firstRes = screen.getByText('2% Reduced Fat Milk - Southern Home');
      fireEvent.click(firstRes);
    });
    expect(
      screen.queryByText('2% Reduced Fat Milk - Southern Home')
    ).toBeInTheDocument();
    expect(screen.queryByText('1 cup')).toBeInTheDocument();
    expect(screen.queryByText('Butter')).toBeInTheDocument();
    expect(screen.queryByText('1 tbsp')).not.toBeInTheDocument();
    expect(screen.queryByText('100 g')).not.toBeInTheDocument();
  });

  it('should call addFood when the "Add" button is clicked', async () => {
    render(<FoodSearch />);

    const input = screen.getByPlaceholderText('Search for a food...');
    const searchButton = screen.getByText('Search');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'Fat Milk' } });
    fireEvent.click(searchButton);

    // Wait for the search results to load
    await waitFor(() => {
      expect(fetchFoodData).toHaveBeenCalledWith('Fat Milk');
    });

    // Expand first search result
    await waitFor(() => {
      const firstRes = screen.getByText('2% Reduced Fat Milk - Southern Home');
      fireEvent.click(firstRes);
    });

    // Simulate clicking "Add" button for 1 cup of Fat Milk
    const addButton = screen.getAllByRole('button', { name: 'Add serving' })[0];
    fireEvent.click(addButton);

    // Verify that addFood was called with the correct food item
    const calledFood = mockFoodData.find(
      (d) => d.food_name === '2% Reduced Fat Milk'
    );
    const calledServing = calledFood?.servings.serving.find(
      (d) => d.serving_description === '1 cup'
    );
    expect(mockAddFood).toHaveBeenCalledWith(calledFood, calledServing);
  });
});
