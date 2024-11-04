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
  foodsLoading: boolean,
  addFood: (
    food: FatsecretFood,
    serving: FatsecretServing,
    qty: number
  ) => void;
}

export const FoodContext = createContext<FoodContextType | undefined>(
  undefined
);

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<FatsecretFood[]>([]);

  // Use useQuery to fetch foods with loading and error state handling
  const { data: foodsData, isLoading: foodsLoading } = useQuery({
    queryKey: ['foods', getCurrentDate()],
    queryFn: async () => {
      return await convexClient.query(api.food.getAll, {
        date: getCurrentDate(),
      });
    },
    gcTime: Infinity
  });

  useEffect(() => {
    if(foodsData) {
      setFoods(foodsData);
    }
  }, [foodsData]);

  // Mutation for upsert food to Convex
  const upsertFood = useMutation({
    mutationFn: async (food: FatsecretFood) => {
      return convexClient.mutation(api.food.upsert, { food });
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
    []
  );

  return (
    <FoodContext.Provider value={{ foods, addFood, foodsLoading }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodContext() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
}
