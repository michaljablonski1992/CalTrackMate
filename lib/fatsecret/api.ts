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
  cholesterol?: string;
  sodium?: string;
  potassium?: string;
  fiber?: string;
  sugar?: string;
  vitamin_d?: string;
  vitamin_a?: string;
  vitamin_c?: string;
  calcium?: string;
  iron?: string;
}

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

export const MAX_RESULTS: number = 20;
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