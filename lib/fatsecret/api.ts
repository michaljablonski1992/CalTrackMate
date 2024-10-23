//// TYPES / INTERFACES
export interface FatsecretFood {
  food_id: string;
  food_name: string;
  food_type: FatsecretFoodType;
  food_url: string;
  brand_name?: string;
  servings: {
    serving: FatsecretServing[]
  }
}

export interface FatsecretServingValues {
  calories: string;
  carbohydrate: string;
  protein: string;
  fat: string;
  saturated_fat?: string;
  polyunsaturated_fat?: string;
  monounsaturated_fat?: string;
  trans_fat?: string;
  cholesterol?: string;
  sodium?: string;
  potassium?: string;
  fiber?: string;
  sugar?: string;
  added_sugars?: string;
  vitamin_d?: string;
  vitamin_a?: string;
  vitamin_c?: string;
  calcium?: string;
  iron?: string;
}

export const servingValuesUnits = {
  calories: 'kcal',
  carbohydrate: 'g',
  protein: 'g',
  fat: 'g',
  saturated_fat: 'g',
  polyunsaturated_fat: 'g',
  monounsaturated_fat: 'g',
  trans_fat: 'g',
  cholesterol: 'mg',
  sodium: 'mg',
  sugar: 'g',
  added_sugars: 'g',
  vitamin_d: 'mg',
  vitamin_a: 'µg',
  vitamin_c: 'mg',
  calcium: 'mg',
  iron: 'mg',
  potassium: 'mg',
  fiber: 'g',
};

export interface FatsecretServing extends FatsecretServingValues {
  serving_id: string;
  serving_description: string;
  serving_url: string;
  metric_serving_amount?: string;
  metric_serving_unit?: string;
  number_of_units: string;
  measurement_description: string;
  quantity?: number;
}

export enum FatsecretFoodType {
  Brand = 'Brand',
  Generic = 'Generic',
}
export interface FatsecretResponse {
  foods_search: FatsecretResponseData
}
export interface FatsecretResponseData {
  results: {
    food: FatsecretFood[]
  }
  max_results: number;
  total_results: number;
  page_number: number;
};

//// CONSTS
export const INPUT_MAX_DECIMALS: number = 4;
export const MAX_RESULTS: number = 20;


//// HELPERS
export function foodDisplayName(food: FatsecretFood){
  const viewArr = [food.food_name];
  if (food.brand_name) {
    viewArr.push(food.brand_name);
  }
  return viewArr.join(' - ');
}

// get call
export async function fetchFoodData(query: string): Promise<any> {
  const response = await fetch(`/api/fatsecret?query=${query}&max_results=${MAX_RESULTS}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from backend');
  }

  const data: FatsecretResponse = await response.json();
  let results = data.foods_search?.results?.food;
  results ??= []
  return results;
}