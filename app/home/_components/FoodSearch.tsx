import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchFoodData } from '@/lib/api';
import { Food, useFoodContext } from '@/context/FoodContext';

export default function FoodSearch() {
  const foodCtx = useFoodContext();
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
            <Button onClick={() => foodCtx.addFood(food)}>Add</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
