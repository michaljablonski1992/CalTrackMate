export interface FatsecretFood {
  food_id: string;
  food_name: string;
  food_type: FatsecretFoodType;
  food_url: string;
  brand_name?: string;
  food_description: string;
  metricUnit?: string;
  metricValue?: number;
  calories?: number;
  fat?: number;
  carbs?: number;
  protein?: number;
}
export enum FatsecretFoodType {
  Brand = 'Brand',
  Generic = 'Generic',
}
export interface FatsecretResponse {
  foods: FatsecretResponseData
}
export interface FatsecretResponseData {
  food: FatsecretFood[];
  max_results: number;
  total_results: number;
  page_number: number;
};

export async function fetchFoodData(query: string): Promise<any> {
  try {
    const response = await fetch(`/api/fatsecret?query=${query}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from backend');
    }

    const data: FatsecretResponse = await response.json();
    return data.foods.food;
  } catch (error) {
    console.error('Error:', error);
  }
}