'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  FatsecretFood,
  FatsecretServing,
  INPUT_MAX_DECIMALS,
} from '@/lib/fatsecret/api';
import { roundTo, getCurrentDate } from '@/lib/utils';
import { convexClient } from '@/providers/ConvexClientProvider';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from '@tanstack/react-query';

interface FoodContextType {
  foods: FatsecretFood[];
  foodFetching: boolean;
  addFood: (
    food: FatsecretFood,
    serving: FatsecretServing,
    qty: number,
    setQty?: boolean
  ) => void;
  removeFood: (food: FatsecretFood, serving?: FatsecretServing) => void;
  currentDate: string;
  setCurrentDate: (date: string) => void;
}

// food actions related to db
enum FoodDbActions {
  Update = 'Update',
  Delete = 'Delete',
}

export const FoodContext = createContext<FoodContextType | undefined>(
  undefined
);

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<FatsecretFood[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());

  // Use useQuery to fetch foods with loading and error state handling
  const { data: foodsData, isFetching: foodFetching } = useQuery({
    queryKey: ['foods', currentDate],
    queryFn: async () => {
      return await convexClient.query(api.food.getAll, {
        date: currentDate,
      });
    },
    gcTime: Infinity,
  });

  useEffect(() => {
    if (foodsData) {
      setFoods(foodsData);
    }
  }, [foodsData]);

  // Mutation for upsert food to Convex
  const upsertFood = useMutation({
    mutationFn: async (food: FatsecretFood) => {
      return convexClient.mutation(api.food.upsert, {
        food,
        date: currentDate,
      });
    },
    onError: (error) => {
      console.error('Failed to sync with database:', error);
    },
  });
  const addFood = useCallback(
    // setQty flag - false => add 'qty' value to quantity / true => replace quantity by 'qty'
    (
      food: FatsecretFood,
      serving: FatsecretServing,
      qty: number = 1,
      setQty?: boolean
    ) => {
      let updatedFood: FatsecretFood | null = null;

      setFoods((prevFoods) => {
        // Make a deep copy of the previous foods array
        const updatedFoods = JSON.parse(
          JSON.stringify(prevFoods)
        ) as FatsecretFood[];

        // Check if the food already exists
        const existingFood = updatedFoods.find(
          (f) => f.food_id === food.food_id
        );

        if (existingFood) {
          // If the food exists, find the specific serving
          const existingServing = existingFood.servings.serving.find(
            (s) => s.serving_id === serving.serving_id
          );

          if (existingServing) {
            // Serving exists: update its quantity
            existingServing.quantity = setQty
              ? roundTo(qty, INPUT_MAX_DECIMALS)
              : roundTo(
                  (existingServing.quantity ?? 0) + qty,
                  INPUT_MAX_DECIMALS
                );
          } else {
            // Serving doesn't exist: add a new one
            existingFood.servings.serving.push({ ...serving, quantity: qty });
          }

          // Update the reference to the modified food
          updatedFood = existingFood;
        } else {
          // Food doesn't exist: create a new food entry with the specified serving
          const newFood: FatsecretFood = {
            ...food,
            servings: {
              serving: [
                { ...serving, quantity: roundTo(qty, INPUT_MAX_DECIMALS) },
              ],
            },
          };
          updatedFoods.push(newFood);
          updatedFood = newFood;
        }

        return updatedFoods;
      });

      // Sync the updated or new food with the database
      if (updatedFood) {
        upsertFood.mutate(updatedFood);
      }
    },
    [upsertFood]
  );
  // Mutation for delete food to Convex
  const deleteFood = useMutation({
    mutationFn: async (food: FatsecretFood) => {
      return convexClient.mutation(api.food.remove, {
        food,
        date: currentDate,
      });
    },
    onError: (error) => {
      console.error('Failed to sync with database:', error);
    },
  });
  const removeFood = useCallback(
    (food: FatsecretFood, serving?: FatsecretServing) => {
      let foodDbAction: FoodDbActions | null = null;
      let updatedFood: FatsecretFood | null = null;

      setFoods((prevFoods) => {
        // Make a deep copy of the previous foods array
        const updatedFoods = JSON.parse(
          JSON.stringify(prevFoods)
        ) as FatsecretFood[];

        // Check if the food already exists
        const foodIndex = updatedFoods.findIndex(
          (f) => f.food_id === food.food_id
        );
        if (foodIndex === -1) {
          // If food is not found, return the previous foods list unchanged
          return prevFoods;
        }
        // If a specific serving is provided, modify the servings for the selected food
        const existingFood = updatedFoods[foodIndex];
        updatedFood = existingFood;

        if (serving) {
          existingFood.servings.serving = existingFood.servings.serving.filter(
            (s) => s.serving_id !== serving.serving_id
          );
          foodDbAction = FoodDbActions.Update;

          // If no servings remain, remove the entire food item from the list
          if (existingFood.servings.serving.length === 0) {
            updatedFoods.splice(foodIndex, 1);
            foodDbAction = FoodDbActions.Delete;
          }
        } else {
          // If no specific serving is provided, remove the entire food item
          updatedFoods.splice(foodIndex, 1);
          foodDbAction = FoodDbActions.Delete;
        }

        return updatedFoods;
      });

      // Sync the update/delete with db
      if (updatedFood && foodDbAction) {
        switch (foodDbAction) {
          case FoodDbActions.Update:
            upsertFood.mutate(updatedFood);
            break;
          case FoodDbActions.Delete:
            deleteFood.mutate(updatedFood);
            break;
        }
      }
    },
    []
  );

  const handleSetCurrentDate = (date: string) => {
    localStorage.setItem('currentDate', date);
    setCurrentDate(date);
  };

  const value = {
    foods,
    addFood,
    foodFetching,
    setCurrentDate: handleSetCurrentDate,
    currentDate,
    removeFood,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}

export function useFoodContext() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
}
