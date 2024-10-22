import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FatsecretFood, fetchFoodData } from '@/lib/fatsecret/api';
import FoodSearchResult from './FoodSearchResult';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScrollIcon, UtensilsCrossedIcon } from 'lucide-react';
import CardWrapper from '@/components/shared/CardWrapper';

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FatsecretFood[]>([]);

  const handleSearch = async () => {
    const data = await fetchFoodData(query);
    setResults(data);
  };

  return (
    <CardWrapper
      label="Add Food"
      labelIcon={UtensilsCrossedIcon}
      gridClasses="lg:row-span-4 lg:col-span-2"
      titleContent={
        <div className="mt-4 flex space-x-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a food..."
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      }
    >
      {results.length === 0 && (
        <div className="flex items-center justify-center flex-col text-muted-foreground">
          <p className="text-2xl">No results</p>
          <ScrollIcon style={{ width: '4rem', height: '4rem' }} />
        </div>
      )}
      {results.length > 0 && (
        <ScrollArea>
          <ul className="mx-2">
            {results.map((food) => (
              <FoodSearchResult key={food.food_id} food={food} />
            ))}
          </ul>
        </ScrollArea>
      )}
    </CardWrapper>
  );
}
