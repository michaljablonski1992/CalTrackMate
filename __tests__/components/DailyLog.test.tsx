// __tests__/components/DailyLog.test.tsx

import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DailyLog from '@/app/home/_components/DailyLog/DailyLog';
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
    expect(
      screen.getByText('There are no entries in log yet')
    ).toBeInTheDocument();
  });

  it('should correctly show added food with servings', () => {
    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: mockAddedFoodsData,
    });

    // Render the DailyLog component
    render(<DailyLog />);

    // Assert 'no entries text' doesn't exist
    expect(
      screen.queryByText('There are no entries in log yet')
    ).not.toBeInTheDocument();

    // Get rows - exclude header
    const table = screen.getByRole('table', { name: 'Foods table' });
    // Access the tbody within the table
    const rows = within(table).getAllByRole('row');

    // Expected rows
    const expectedRows = [
      ['2% Reduced Fat Milk', 'Southern Home', '', ''],
      ['1 cup', '', '3', ''],
      ['1 tbsp', '', '10', ''],
      ['Butter', '', '', ''],
      ['1 tbsp', '', '2', ''],
    ];

    // Check rows length
    expect(rows.length).toEqual(expectedRows.length + 1); // +1 for header;
    // Check content excluding header
    rows.slice(1).forEach((row, index) => {
      const expectedRow = expectedRows[index];
      const cells = within(row).getAllByRole('cell');
      // Map over cells to get either textContent or input value
      const cellValues = cells.map((cell) => {
        const input = cell.querySelector('input'); // Check if cell contains an input
        return input ? (input as HTMLInputElement).value : cell.textContent;
      });

      cellValues.forEach((val, index) => {
        expect(val).toEqual(expectedRow[index]);
      });
    });
  });

  it('should correctly remove food', () => {
    const mockRemoveFood = jest.fn();

    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: mockAddedFoodsData,
      removeFood: mockRemoveFood,
    });

    // Render the DailyLog component
    render(<DailyLog />);

    // Simulate clicking "Remove food" button for 1 cup of Fat Milk
    const addButton = screen.getAllByRole('button', { name: 'Remove food' })[0];
    fireEvent.click(addButton);

    // Confirm dialog
    const confirmButton = screen.getAllByRole('button', {
      name: 'Confirm record delete',
    })[0];
    fireEvent.click(confirmButton);

    // Verify that addFood was called with the correct food item
    const calledFood = mockAddedFoodsData.find(
      (d) => d.food_name === '2% Reduced Fat Milk'
    );
    expect(mockRemoveFood.mock.lastCall[0].food_id).toEqual(
      calledFood?.food_id
    );
  });
  it('should correctly remove serving', () => {
    const mockRemoveFood = jest.fn();

    // Mock the return value of useFoodContext to provide the mock foods
    (useFoodContext as jest.Mock).mockReturnValue({
      foods: mockAddedFoodsData,
      removeFood: mockRemoveFood,
    });

    // Render the DailyLog component
    render(<DailyLog />);

    // Simulate clicking "Remove food" button for 1 cup of Fat Milk
    const addButton = screen.getAllByRole('button', {
      name: 'Remove serving',
    })[0];
    fireEvent.click(addButton);

    // Confirm dialog
    const confirmButton = screen.getAllByRole('button', {
      name: 'Confirm record delete',
    })[0];
    fireEvent.click(confirmButton);

    // Verify that addFood was called with the correct food item
    const calledFood = mockAddedFoodsData.find(
      (d) => d.food_name === '2% Reduced Fat Milk'
    );
    const calledServing = calledFood?.servings.serving.find(
      (d) => d.serving_description === '1 cup'
    );
    expect(mockRemoveFood.mock.lastCall[0].food_id).toEqual(
      calledFood?.food_id
    );
    expect(mockRemoveFood.mock.lastCall[1].serving_id).toEqual(
      calledServing?.serving_id
    );
  });
});
