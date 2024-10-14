import React from 'react';
import { Food } from '@/lib/api';

interface DailyLogProps {
  foods: Food[];
}

export default function DailyLog({ foods }: DailyLogProps) {
  return (
    <ul>
      {foods.map((food, index) => (
        <li key={index} className="mb-2">
          {food.name} - {food.calories} cal
        </li>
      ))}
    </ul>
  );
}
