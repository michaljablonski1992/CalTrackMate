import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodContextType {
  foods: Food[];
  addFood: (food: Food) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<Food[]>([]);

  const addFood = useCallback((food: Food) => {
    setFoods((prevFoods) => [...prevFoods, food]);
  }, []);


  return (
    <FoodContext.Provider value={{ foods, addFood }}>
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
