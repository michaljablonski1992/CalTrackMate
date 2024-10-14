import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Food, fetchFoodData } from '@/lib/api';

interface Props {
  onAddFood: (food: Food) => void;
}
export default function FoodSearch({ onAddFood }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Food[]>([]);

  const handleSearch = async () => {
    const data = await fetchFoodData(query);
    setResults(data);
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a food..."
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <ul>
        {results.map((food) => (
          <li key={food.id} className="flex justify-between items-center mb-2">
            <span>
              {food.name} - {food.calories} cal
            </span>
            <Button onClick={() => onAddFood(food)}>Add</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
