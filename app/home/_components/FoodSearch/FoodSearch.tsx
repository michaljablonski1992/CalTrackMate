import { useState } from 'react';
import { Input } from '@/components/ui/input';
import FoodSearchResult from './FoodSearchResult';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CircleXIcon, SearchXIcon, UtensilsCrossedIcon } from 'lucide-react';
import CardWrapper from '@/components/shared/CardWrapper';
import { useFetchFoodData } from '@/hooks/useFetchFoodData';
import CardInfo from '@/components/shared/CardInfo';
import FoodSearchSkeleton from './FoodSearchSkeleton';

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const { data, loading, error } = useFetchFoodData(query);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setQuery(formData.get('query') as string);
  };

  return (
    <CardWrapper
      label="Add Food"
      labelIcon={UtensilsCrossedIcon}
      gridClasses="lg:row-span-4 lg:col-span-2"
      titleContent={
        <form onSubmit={handleSearch}>
          <div className="mt-4 flex space-x-2">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a food..."
            />
          </div>
        </form>
      }
    >
      {loading && <FoodSearchSkeleton />}
      {!loading && error && <CardInfo text={error} icon={CircleXIcon} mode='danger' />}
      {!loading && !error && (
        <>
          {data.length === 0 && (
            <CardInfo text="No results" icon={SearchXIcon} />
          )}
          {data.length > 0 && (
            <ScrollArea>
              <ul className="mx-2">
                {data.map((food) => (
                  <FoodSearchResult key={food.food_id} food={food} />
                ))}
              </ul>
            </ScrollArea>
          )}
        </>
      )}
    </CardWrapper>
  );
}
