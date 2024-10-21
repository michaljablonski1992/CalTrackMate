import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FatsecretFood } from "./fatsecret/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformKeyToString(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export function foodDisplayName(food: FatsecretFood){
  const viewArr = [food.food_name];
  if (food.brand_name) {
    viewArr.push(food.brand_name);
  }
  return viewArr.join(' - ');
}