import { createContext, useContext, useState, useCallback } from 'react';
import { FatsecretFood, FatsecretServing } from '@/lib/fatsecret/api';

interface FoodContextType {
  foods: FatsecretFood[];
  addFood: (food: FatsecretFood, serving: FatsecretServing) => void;
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<FatsecretFood[]>([]);

  const addFood = useCallback((food: FatsecretFood, serving: FatsecretServing) => {
    setFoods((prevFoods) => {
      const newFoods: FatsecretFood[] = JSON.parse(JSON.stringify(prevFoods));

      // check if food exists
      const existingFood = newFoods.find(exFood => exFood.food_id === food.food_id);
      if(existingFood) { // if food exists
        // check if serving exists
        const existingServing = existingFood.servings.serving.find(exServ => exServ.serving_id === serving.serving_id);
        if(existingServing) { // if serving exists - add quantity
          existingServing.quantity ??= 0;
          existingServing.quantity += 1;
        } else { // if serving doesn't exist - add serving
          serving.quantity ??= 1; 
          existingFood.servings.serving.push(serving);
        }
        return newFoods; 
      } else {  // if food doesn't exist - add food and serving
        const newFood: FatsecretFood = JSON.parse(JSON.stringify(food));
        const newServing: FatsecretServing = JSON.parse(JSON.stringify(serving));
        newServing.quantity ??= 0;
        newServing.quantity += 1;
        newFood.servings.serving = [newServing]
        newFoods.push(newFood);
        return newFoods;
      }
    });
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
