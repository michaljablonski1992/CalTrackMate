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
  foodsLoading: boolean;
  addFood: (
    food: FatsecretFood,
    serving: FatsecretServing,
    qty: number
  ) => void;
  currentDate: string;
  setCurrentDate: (date: string) => void;
}

export const FoodContext = createContext<FoodContextType | undefined>(
  undefined
);

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<FatsecretFood[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());

  // Use useQuery to fetch foods with loading and error state handling
  const { data: foodsData, isLoading: foodsLoading } = useQuery({
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
    (food: FatsecretFood, serving: FatsecretServing, qty: number = 1) => {
      let updatedFood: FatsecretFood | null = null;

      setFoods((prevFoods) => {
        const newFoods = JSON.parse(
          JSON.stringify(prevFoods)
        ) as FatsecretFood[];

        const existingFood = newFoods.find((f) => f.food_id === food.food_id);
        if (existingFood) {
          // food exists
          const existingServing = existingFood.servings.serving.find(
            (s) => s.serving_id === serving.serving_id
          );
          if (existingServing) {
            // serving exists
            existingServing.quantity = roundTo(
              (existingServing.quantity ?? 0) + qty,
              INPUT_MAX_DECIMALS
            );
          } else {
            // serving doesn't exist
            existingFood.servings.serving.push({ ...serving, quantity: qty });
          }

          updatedFood = existingFood;
        } else {
          // food doesn't exist
          const newFood: FatsecretFood = {
            ...food,
            servings: {
              serving: [
                { ...serving, quantity: roundTo(qty, INPUT_MAX_DECIMALS) },
              ],
            },
          };
          newFoods.push(newFood);
          updatedFood = newFood;
        }

        return newFoods;
      });

      // Sync the updated or new food with the database
      if (updatedFood) {
        upsertFood.mutate(updatedFood);
      }
    },
    [upsertFood]
  );

  const handleSetCurrentDate = (date: string) => {
    localStorage.setItem('currentDate', date);
    setCurrentDate(date);
  }

  const value = {
    foods,
    addFood,
    foodsLoading,
    setCurrentDate: handleSetCurrentDate,
    currentDate,
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
