import { FatsecretFood, FatsecretFoodType } from '@/lib/fatsecret/api';

// mock data returned from Fatsecret API
export const mockFoodData1 = {
  food_id: '86784',
  food_name: '2% Reduced Fat Milk',
  brand_name: 'Southern Home',
  food_type: FatsecretFoodType.Brand,
  food_url:
    'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
  servings: {
    serving: [
      {
        serving_id: '130538',
        serving_description: '1 cup',
        serving_url:
          'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
        metric_serving_amount: '236.000',
        metric_serving_unit: 'g',
        number_of_units: '1.000',
        measurement_description: 'serving',
        calories: '120',
        carbohydrate: '12.00',
        protein: '8.00',
        fat: '5.00',
        saturated_fat: '3.000',
        cholesterol: '20',
        sodium: '130',
        fiber: '0',
        sugar: '12.00',
      },
    ],
  },
}
export const mockFoodData: FatsecretFood[] = [
  mockFoodData1,
  {
    food_id: '33814',
    food_name: 'Butter',
    food_type: FatsecretFoodType.Generic,
    food_url: 'https://www.fatsecret.com/calories-nutrition/usda/butter',
    servings: {
      serving: [
        {
          serving_id: '29479',
          serving_description: '1 tbsp',
          serving_url:
            'https://www.fatsecret.com/calories-nutrition/usda/butter?portionid=29479&portionamount=1.000',
          metric_serving_amount: '14.200',
          metric_serving_unit: 'g',
          number_of_units: '1.000',
          measurement_description: 'tbsp',
          calories: '102',
          carbohydrate: '0.01',
          protein: '0.12',
          fat: '11.52',
          saturated_fat: '7.294',
          polyunsaturated_fat: '0.432',
          monounsaturated_fat: '2.985',
          trans_fat: '0.12',
          cholesterol: '31',
          sodium: '2',
          potassium: '3',
          fiber: '0',
          sugar: '0.01',
          added_sugars: '0.13',
          vitamin_a: '97',
          vitamin_c: '0.0',
          calcium: '3',
          iron: '0.00',
        },
        {
          serving_id: '56545',
          serving_description: '100 g',
          serving_url:
            'https://www.fatsecret.com/calories-nutrition/usda/butter?portionid=56545&portionamount=100.000',
          metric_serving_amount: '100.000',
          metric_serving_unit: 'g',
          number_of_units: '100.000',
          measurement_description: 'g',
          calories: '717',
          carbohydrate: '0.06',
          protein: '0.85',
          fat: '81.11',
          saturated_fat: '51.368',
          polyunsaturated_fat: '3.043',
          monounsaturated_fat: '21.021',
          cholesterol: '215',
          sodium: '11',
          potassium: '24',
          fiber: '0',
          sugar: '0.06',
          vitamin_a: '684',
          vitamin_c: '0',
          calcium: '24',
          iron: '0.02',
        },
      ],
    },
  },
];

// mock data from FoodContext
export const mockAddedFoodsData1 = {
  food_id: '86784',
  food_name: '2% Reduced Fat Milk',
  brand_name: 'Southern Home',
  food_type: FatsecretFoodType.Brand,
  food_url:
    'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
  servings: {
    serving: [
      {
        serving_id: '130538',
        serving_description: '1 cup',
        serving_url:
          'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
        metric_serving_amount: '236.000',
        metric_serving_unit: 'g',
        number_of_units: '1.000',
        measurement_description: 'serving',
        calories: '100',
        carbohydrate: '1.11',
        protein: '2',
        fat: '3',
        saturated_fat: '5',
        polyunsaturated_fat: '15',
        monounsaturated_fat: '25.77',
        cholesterol: '55',
        sodium: '11',
        potassium: '12.12',
        fiber: '13',
        sugar: '14',
        vitamin_d: '15',
        vitamin_a: '16',
        vitamin_c: '17',
        calcium: '18',
        iron: '19',
        quantity: 3,
      },
      {
        serving_id: '130535',
        serving_description: '1 tbsp',
        serving_url:
          'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
        metric_serving_amount: '14.000',
        metric_serving_unit: 'g',
        number_of_units: '1.000',
        measurement_description: 'serving',
        calories: '1',
        carbohydrate: '2',
        protein: '3',
        fat: '4',
        saturated_fat: '5',
        polyunsaturated_fat: '6',
        monounsaturated_fat: '7',
        cholesterol: '8',
        sodium: '9',
        potassium: '10',
        fiber: '11',
        sugar: '12',
        vitamin_d: '13',
        vitamin_a: '14',
        vitamin_c: '15',
        calcium: '16',
        iron: '17',
        quantity: 10,
      },
    ],
  },
}
export const mockAddedFoodsData = [
  mockAddedFoodsData1,
  {
    food_id: '33814',
    food_name: 'Butter',
    food_type: FatsecretFoodType.Generic,
    food_url: 'https://www.fatsecret.com/calories-nutrition/usda/butter',
    servings: {
      serving: [
        {
          serving_id: '130500',
          serving_description: '1 tbsp',
          serving_url:
            'https://www.fatsecret.com/calories-nutrition/southern-home/2%25-reduced-fat-milk',
          metric_serving_amount: '14.000',
          metric_serving_unit: 'g',
          number_of_units: '1.000',
          measurement_description: 'serving',
          calories: '4',
          carbohydrate: '20',
          protein: '30',
          fat: '40',
          saturated_fat: '50',
          polyunsaturated_fat: '60',
          monounsaturated_fat: '70',
          trans_fat: '0.12',
          cholesterol: '80',
          sodium: '90',
          potassium: '100',
          fiber: '110',
          sugar: '120',
          added_sugars: '0.13',
          vitamin_d: '130',
          vitamin_a: '140',
          vitamin_c: '150',
          calcium: '160',
          iron: '170',
          quantity: 2,
        },
      ],
    },
  },
];
