import { createContext, useContext, useState, useCallback } from 'react';
import { FatsecretFood } from '@/lib/fatsecret/api';

interface FoodContextType {
  foods: FatsecretFood[];
  addFood: (food: FatsecretFood) => void;
  transformFoodData: (food: FatsecretFood) => FatsecretFood;
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<FatsecretFood[]>([]);

  const transformFoodData = useCallback((food: FatsecretFood) => {
    const description = food.food_description;
    // Regular expressions to extract the metric and nutritional values
    const metricMatch = description.match(/Per\s*(\d+(\.\d+)?)\s*(g|oz|fl\s*oz|cup|bottle|can|bar|pieces|slice|serving)/); // Matches "Per 101g", "Per 4 oz", etc.
    const caloriesMatch = description.match(/Calories:\s*([\d.]+)kcal/);
    const fatMatch = description.match(/Fat:\s*([\d.]+)g/);
    const carbsMatch = description.match(/Carbs:\s*([\d.]+)g/);
    const proteinMatch = description.match(/Protein:\s*([\d.]+)g/);

    // Extract metric value and unit (e.g., "101g" or "4 oz")
    const metricValue = metricMatch ? metricMatch[1] : ''; // Numeric value (e.g., '101')
    const metricUnit = metricMatch ? metricMatch[3] : ''; // 'g' or 'oz'

    // Extract the numeric values and return them in an object
    food.metricValue = parseFloat(metricValue); // The metric value like '101' or '4'
    food.metricUnit = metricUnit; // The metric like 'g' or 'oz'
    food.calories = caloriesMatch ? parseFloat(caloriesMatch[1]) : 0
    food.fat = fatMatch ? parseFloat(fatMatch[1]) : 0
    food.carbs = carbsMatch ? parseFloat(carbsMatch[1]) : 0
    food.protein = proteinMatch ? parseFloat(proteinMatch[1]) : 0

    return food;
  }, [])

  const addFood = useCallback((food: FatsecretFood) => {
    const foodWithData = transformFoodData(food);
    setFoods((prevFoods) => [...prevFoods, foodWithData]);
  }, [transformFoodData]);


  return (
    <FoodContext.Provider value={{ foods, addFood, transformFoodData }}>
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
