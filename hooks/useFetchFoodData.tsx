import { FatsecretFood } from '@/lib/fatsecret/api';
import { useState, useEffect } from 'react';
import { fetchFoodData } from '@/lib/fatsecret/api';

export function useFetchFoodData(query: string) {
  const [data, setData] = useState<FatsecretFood[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // get on every query change with 700ms debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        const fetchData = async () => {
          setLoading(true);
          setError(null);

          try {
            const results = await fetchFoodData(query);
            setData(results);
          } catch {
            setError('Something went wrong, try again later');
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }
    }, 700);

    // Cleanup function to cancel previous setTimeout if query changes
    return () => clearTimeout(handler);
  }, [query]);

  return { data, loading, error };
}