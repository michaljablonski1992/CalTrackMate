import { Skeleton } from '@/components/ui/skeleton';
import { MAX_RESULTS } from '@/lib/fatsecret/api'

const FoodSearchSkeleton = () => {
  return (
    <ul className="h-full space-y-4 overflow-hidden flex flex-col flex-grow">
      {Array.from({ length: MAX_RESULTS }).map((_, index) => (
        <li key={index} className='flex flex-row gap-2 items-center'>
          <Skeleton className="flex h-6 w-6" />
          <Skeleton className="flex h-10 flex-grow" />
        </li>
      ))}
    </ul>
  );
};

export default FoodSearchSkeleton;
