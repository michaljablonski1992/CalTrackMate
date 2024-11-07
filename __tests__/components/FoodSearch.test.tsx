// __tests__/FoodSearch.test.tsx
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

// Mock the Convex client and set up a dummy CONVEX_URL
jest.mock('@/providers/ConvexClientProvider', () => ({
  convexClient: {},
}));

describe('FoodSearch Component', () => {
  const mockAddFood = jest.fn();

  beforeEach(() => {
    // Mock the useFoodContext implementation
    (useFoodContext as jest.Mock).mockReturnValue({
      addFood: mockAddFood,
    });
  });

  it('should render the search input and button and initial no results message', () => {
    render(<FoodSearch />);

    expect(
      screen.getByPlaceholderText('Search for a food...')
    ).toBeInTheDocument();
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('should search for foods and display results', async () => {
    // Mock fetchFoodData to return mock food data
    (fetchFoodData as jest.Mock).mockResolvedValue(mockFoodData);
    render(<FoodSearch />);

    const input = screen.getByPlaceholderText('Search for a food...');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'Butter' } });
    expect(input).toHaveValue('Butter');

    // Wait for the mocked fetchFoodData call to resolve
    await waitFor(() => {
      expect(fetchFoodData).toHaveBeenCalledWith('Butter');
    });

    // expect 'no results' message doesn't exist
    expect(screen.queryByText('No results')).not.toBeInTheDocument();

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

  it('should search for foods and display message when no results', async () => {
    // Mock fetchFoodData to return mock food data
    (fetchFoodData as jest.Mock).mockResolvedValue([]);
    render(<FoodSearch />);

    const input = screen.getByPlaceholderText('Search for a food...');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'Butter' } });
    expect(input).toHaveValue('Butter');

    // Wait for the mocked fetchFoodData call to resolve
    await waitFor(() => {
      expect(fetchFoodData).toHaveBeenCalledWith('Butter');
    });

    // expect 'no results' message exists
    expect(screen.getByText('No results')).toBeInTheDocument();
  });
});
