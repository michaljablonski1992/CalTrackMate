import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformKeyToString(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function roundTo(num: number, decimals: number) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}