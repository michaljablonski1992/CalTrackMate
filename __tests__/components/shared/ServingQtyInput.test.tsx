import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServingQtyInput, {
  MODS as QTY_INPUT_MODS,
} from '@/app/home/_components/shared/ServingQtyInput';
import { useFoodContext } from '@/context/FoodContext';
import {
  mockFoodData1,
  mockAddedFoodsData1,
} from '@/__tests__/mocks/_mockFoodData';
import { act } from 'react';

// Mock the useFoodContext
jest.mock('@/context/FoodContext', () => ({
  ...jest.requireActual('@/context/FoodContext'),
  useFoodContext: jest.fn(),
}));

// Mock the Convex client and set up a dummy CONVEX_URL
jest.mock('@/providers/ConvexClientProvider', () => ({
  convexClient: {},
}));

const setValue = (val: string) => {
  const input = screen.getByRole('spinbutton', { name: 'Serving Quantity' });
  act(() => {
    fireEvent.change(input, { target: { value: val } });
  });
};

const getValue = () => {
  const input = screen.getByRole('spinbutton', { name: 'Serving Quantity' });
  return (input as HTMLButtonElement).value;
};

const clickAdd = (name: string) => {
  const addButton = screen.getAllByRole('button', {
    name: name,
  })[0];
  act(() => {
    fireEvent.click(addButton);
  });
};

describe('ServingQtyInput Component', () => {
  const mockAddFood = jest.fn();

  beforeEach(() => {
    // Mock the useFoodContext implementation
    (useFoodContext as jest.Mock).mockReturnValue({
      addFood: mockAddFood,
    });
    mockAddFood.mockReset();
  });

  describe('Component in ADD mode', () => {
    beforeEach(() => {
      render(
        <ServingQtyInput
          food={mockFoodData1}
          serving={mockFoodData1.servings.serving[0]}
          mode={QTY_INPUT_MODS.ADD}
        />
      );
    });
    it('should call addFood when the "Add" button is clicked with default quantity', async () => {
      // Simulate clicking "Add" button
      clickAdd('Add serving');

      // Invalid message yet
      expect(screen.queryByText('Invalid value')).not.toBeInTheDocument();

      // expect mockAddFood called
      expect(mockAddFood.mock.calls.length).toBe(1);
      expect(mockAddFood).toHaveBeenCalledWith(
        mockFoodData1,
        mockFoodData1.servings.serving[0],
        1,
        false
      );
    });

    it('should call addFood when the "Add" button is clicked with custom quantity', async () => {
      // Change quantity
      setValue('3.33');

      // Simulate clicking "Add" button
      clickAdd('Add serving');

      // Invalid message yet
      expect(screen.queryByText('Invalid value')).not.toBeInTheDocument();

      // expect mockAddFood called
      expect(mockAddFood.mock.calls.length).toBe(1);
      expect(mockAddFood).toHaveBeenCalledWith(
        mockFoodData1,
        mockFoodData1.servings.serving[0],
        3.33,
        false
      );
    });

    it('should not call addFood when the "Add" button is clicked with invalid quantity', async () => {
      // Change quantity
      setValue('0');

      // No invalid message yet
      expect(screen.queryByText('Invalid value')).not.toBeInTheDocument();

      // Simulate clicking "Add" button
      clickAdd('Add serving');

      // Invalid message shown
      expect(screen.queryAllByText('Invalid value')[0]).toBeInTheDocument();

      // expect mockAddFood not called
      expect(mockAddFood.mock.calls.length).toBe(0);
    });
  });

  describe('Component in EDIT mode', () => {
    beforeEach(() => {
      render(
        <ServingQtyInput
          food={mockAddedFoodsData1}
          serving={mockAddedFoodsData1.servings.serving[0]}
          mode={QTY_INPUT_MODS.EDIT}
        />
      );
    });
    it('should not show confirm/cancel button until value changed', async () => {
      const serving = mockAddedFoodsData1.servings.serving[0];
      // No buttons initially
      expect(
        screen.queryByRole('button', {
          name: 'Confirm',
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'Cancel',
        })
      ).not.toBeInTheDocument();

      // Set value
      setValue((serving.quantity + 1).toString());

      // Buttons shown
      expect(
        screen.queryByRole('button', {
          name: 'Confirm',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'Cancel',
        })
      ).toBeInTheDocument();

      // Set value to initial value
      setValue(serving.quantity.toString());

      // Buttons hidden again
      expect(
        screen.queryByRole('button', {
          name: 'Confirm',
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'Cancel',
        })
      ).not.toBeInTheDocument();
    });

    it('should restore initial value and hide buttons on cancel', async () => {
      const serving = mockAddedFoodsData1.servings.serving[0];
      // Set value
      setValue((serving.quantity + 1).toString());

      // Get button
      const cancelButton = screen.getByRole('button', {
        name: 'Cancel',
      });

      // Click button
      act(() => {
        fireEvent.click(cancelButton);
      });

      // Buttons hidden
      expect(
        screen.queryByRole('button', {
          name: 'Confirm',
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'Cancel',
        })
      ).not.toBeInTheDocument();

      // Value restored to initial
      expect(getValue()).toEqual(serving.quantity.toString());
    });

    it('should not call addFood when the "Confirm" button is clicked with invalid quantity', async () => {
      // Change quantity
      setValue('0');

      // No invalid message yet
      expect(screen.queryByText('Invalid value')).not.toBeInTheDocument();

      // Simulate clicking "Confirm" button
      clickAdd('Confirm');

      // Invalid message shown
      expect(screen.queryAllByText('Invalid value')[0]).toBeInTheDocument();

      // expect mockAddFood not called
      expect(mockAddFood.mock.calls.length).toBe(0);
    });

    it('should call addFood when the "Confirm" button is clicked with valid quantity', async () => {
      // Change quantity
      setValue('5.12');

      // Simulate clicking "Confirm" button
      clickAdd('Confirm');

      // Invalid message yet
      expect(screen.queryByText('Invalid value')).not.toBeInTheDocument();

      // expect mockAddFood called
      expect(mockAddFood.mock.calls.length).toBe(1);
      expect(mockAddFood).toHaveBeenCalledWith(
        mockAddedFoodsData1,
        mockAddedFoodsData1.servings.serving[0],
        5.12,
        true
      );
    });
  });
});
