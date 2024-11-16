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
import userEvent from '@testing-library/user-event';
import { INPUT_MAX_VALUE } from '@/lib/fatsecret/api';

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

const typeValue = async (val: string) => {
  const input = screen.getByRole('spinbutton', { name: 'Serving Quantity' });
  await userEvent.type(input, val);
};

const assertValue = (val: number) => {
  const input = screen.getByRole('spinbutton', { name: 'Serving Quantity' });
  expect(input).toHaveValue(val);
};

const assertNoError = (error: string) => {
  expect(screen.queryByText(error)).not.toBeInTheDocument();
};

const assertError = (error: string) => {
  expect(screen.queryAllByText(error)[0]).toBeInTheDocument();
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
    it('should call addFood when the "Add" button is clicked with default quantity', () => {
      // Simulate clicking "Add" button
      clickAdd('Add serving');

      // No invalid message
      assertNoError('Invalid value');

      // expect mockAddFood called
      expect(mockAddFood.mock.calls.length).toBe(1);
      expect(mockAddFood).toHaveBeenCalledWith(
        mockFoodData1,
        mockFoodData1.servings.serving[0],
        1,
        false
      );
    });

    it('should call addFood when the "Add" button is clicked with custom quantity', () => {
      // Change quantity
      setValue('3.33');

      // Simulate clicking "Add" button
      clickAdd('Add serving');

      // No invalid message
      assertNoError('Invalid value');

      // expect mockAddFood called
      expect(mockAddFood.mock.calls.length).toBe(1);
      expect(mockAddFood).toHaveBeenCalledWith(
        mockFoodData1,
        mockFoodData1.servings.serving[0],
        3.33,
        false
      );
    });

    it('should not call addFood when the "Add" button is clicked with invalid quantity', () => {
      // Change quantity
      setValue('0');

      // No invalid message yet
      assertNoError('Invalid value');

      // Simulate clicking "Add" button
      clickAdd('Add serving');

      // Invalid message shown
      assertError('Invalid value');

      // expect mockAddFood not called
      expect(mockAddFood.mock.calls.length).toBe(0);
    });

    it('should call addFood when the "Add serving" button is clicked with valid edge quantity', () => {
      // Change quantity
      setValue(INPUT_MAX_VALUE.toString());

      // Simulate clicking "Add serving" button
      clickAdd('Add serving');

      // No invalid message
      assertNoError('Invalid value');

      // expect mockAddFood called
      expect(mockAddFood.mock.calls.length).toBe(1);
      expect(mockAddFood).toHaveBeenCalledWith(
        mockFoodData1,
        mockFoodData1.servings.serving[0],
        INPUT_MAX_VALUE,
        false
      );
    });

    it('should not be able to set value with more than 4 decimals', () => {
      // Change quantity
      setValue('999.99999');

      // Value ignored on paste, set back to initial value
      assertValue(1);
    });

    it('should not be able to type value with more than 4 decimals', async () => {
      // clear existing value
      setValue('0');

      // type new value
      await typeValue('999.99999');

      // Value changed on type, set to valid value
      assertValue(999.9999);
    });

    it('should not call addFood when the "Add serving" button is clicked with value greater than INPUT_MAX_VALUE', () => {
      // Change quantity
      setValue((INPUT_MAX_VALUE + 0.0001).toString());

      // Simulate clicking "Add serving" button
      clickAdd('Add serving');

      // Invalid message
      assertError(`Maximum quantity is: ${INPUT_MAX_VALUE}`);

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
    it('should not show confirm/cancel button until value changed', () => {
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

    it('should restore initial value and hide buttons on cancel', () => {
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
      assertValue(serving.quantity);
    });

    it('should not call addFood when the "Confirm" button is clicked with invalid quantity', () => {
      // Change quantity
      setValue('0');

      // No invalid message yet
      assertNoError('Invalid value');

      // Simulate clicking "Confirm" button
      clickAdd('Confirm');

      // Invalid message shown
      assertError('Invalid value');

      // expect mockAddFood not called
      expect(mockAddFood.mock.calls.length).toBe(0);
    });

    it('should call addFood when the "Confirm" button is clicked with valid edge quantity', () => {
      // Change quantity
      setValue('999.9999');

      // Simulate clicking "Confirm" button
      clickAdd('Confirm');

      // No invalid message
      assertNoError('Invalid value');

      // expect mockAddFood called
      expect(mockAddFood.mock.calls.length).toBe(1);
      expect(mockAddFood).toHaveBeenCalledWith(
        mockAddedFoodsData1,
        mockAddedFoodsData1.servings.serving[0],
        999.9999,
        true
      );
    });

    it('should not be able to set value with more than 4 decimals', () => {
      // Change quantity
      setValue('999.99999');

      // Value ignored on paste, set back to initial value
      assertValue(mockAddedFoodsData1.servings.serving[0].quantity);
    });

    it('should not be able to type value with more than 4 decimals', async () => {
      // clear existing value
      setValue('0');

      // type new value
      await typeValue('999.99999');

      // Value changed on type, set to valid value
      assertValue(999.9999);
    });

    it('should call addFood when the "Confirm" button is clicked with valid quantity', () => {
      // Change quantity
      setValue('5.12');

      // Simulate clicking "Confirm" button
      clickAdd('Confirm');

      // No invalid message
      assertNoError('Invalid value');

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
