import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FatsecretFood, fetchFoodData } from '@/lib/fatsecret/api';
import FoodSearchResult from './FoodSearchResult';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossedIcon } from 'lucide-react';

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FatsecretFood[]>([]);

  const handleSearch = async () => {
    const data = await fetchFoodData(query);
    setResults(data);
  };

  return (
    <Card className="w-full rounded-xl lg:row-span-4 lg:col-span-2">
      <CardHeader className="lg:h-[7rem]">
        <CardTitle className="text-primary">
          <div className="flex items-center gap-2">
            <UtensilsCrossedIcon className="size-5" />
            Add Food
          </div>
        </CardTitle>
        <div className="mt-4 flex space-x-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a food..."
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </CardHeader>
      <CardContent className="lg:h-[calc(100%-7rem)]">
        <div className="grid gap-3 grid-flow-col lg:h-full h-96">
          <ScrollArea>
            <ul className="mx-2">
              {results &&
                results.map((food) => (
                  <FoodSearchResult key={food.food_id} food={food} />
                ))}
            </ul>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
