import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformKeyToString(key: string): string {
  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function roundTo(num: number, decimals: number) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function humanDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getCurrentDate() {
  return localStorage.getItem('currentDate') || getTodayDate();
}

export function getTodayDate() {
  return datetimeToDate(new Date());
}

export function datetimeToDate(datetime: Date) {
  const year = datetime.getFullYear();
  const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(datetime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function dateToDatetime(date: string) {
  return new Date(date);
}
