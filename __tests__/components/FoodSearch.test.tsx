// __tests__/FoodSearch.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodSearch from '@/app/home/_components/FoodSearch';
import { fetchFoodData, FatsecretFoodType, FatsecretFood } from '@/lib/fatsecret/api';
import { useFoodContext } from '@/context/FoodContext';

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
  const mockFoodData: FatsecretFood[] = [
    {
      food_id: '1',
      food_name: 'Apple',
      food_description: 'Per 100g - Calories: 52kcal, Fat: 0.2g, Carbs: 14g, Protein: 0.3g',
      food_type: FatsecretFoodType.Generic,
      food_url: 'url_1'
    },
    {
      food_id: '2',
      food_name: 'Banana',
      food_description: 'Per 100g - Calories: 89kcal, Fat: 0.3g, Carbs: 23g, Protein: 1.1g',
      food_type: FatsecretFoodType.Generic,
      food_url: 'url_2'
    },
  ];

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

    expect(screen.getByPlaceholderText('Search for a food...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should search for foods and display results', async () => {
    render(<FoodSearch />);

    const input = screen.getByPlaceholderText('Search for a food...');
    const searchButton = screen.getByText('Search');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'Apple' } });
    expect(input).toHaveValue('Apple');

    // Simulate clicking the search button
    fireEvent.click(searchButton);

    // Wait for the mocked fetchFoodData call to resolve
    await waitFor(() => {
      expect(fetchFoodData).toHaveBeenCalledWith('Apple');
    });

    // Check that the search results are displayed
    expect(screen.getByText('Apple - Per 100g - Calories: 52kcal, Fat: 0.2g, Carbs: 14g, Protein: 0.3g')).toBeInTheDocument();
    expect(screen.getByText('Banana - Per 100g - Calories: 89kcal, Fat: 0.3g, Carbs: 23g, Protein: 1.1g')).toBeInTheDocument();
  });

  it('should call addFood when the "Add" button is clicked', async () => {
    render(<FoodSearch />);

    const input = screen.getByPlaceholderText('Search for a food...');
    const searchButton = screen.getByText('Search');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'Banana' } });
    fireEvent.click(searchButton);

    // Wait for the search results to load
    await waitFor(() => {
      expect(fetchFoodData).toHaveBeenCalledWith('Banana');
    });

    // Simulate clicking "Add" button for Banana
    const addButton = screen.getAllByText('Add')[1]; // Index 1 for Banana
    fireEvent.click(addButton);

    // Verify that addFood was called with the correct food item
    expect(mockAddFood).toHaveBeenCalledWith({
      food_id: '2',
      food_name: 'Banana',
      food_description: 'Per 100g - Calories: 89kcal, Fat: 0.3g, Carbs: 23g, Protein: 1.1g',
      food_type: FatsecretFoodType.Generic,
      food_url: 'url_2'
    });
  });
});
