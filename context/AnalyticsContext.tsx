'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  subDays,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
} from 'date-fns';
import { convexClient } from '@/providers/ConvexClientProvider';
import { api } from '@/convex/_generated/api';
import { useQuery } from '@tanstack/react-query';
import { datetimeToDate } from '@/lib/utils';
import { FatsecretFoodData } from '@/convex/food';

export enum DateRanges {
  ThisWeek = 'This week',
  LastWeek = 'Last week',
  ThisMonth = 'This month',
  LastMonth = 'Last month',
}

type GroupedFoods = {
  [date: string]: FatsecretFoodData[];
};

interface FoodContextType {
  data: GroupedFoods;
  dataIsFetching: boolean;
  dateRange: string;
  setDateRange: (range: DateRanges) => void;
  nutritionTypes: Set<string>;
  setNutritionTypes: (type: string) => void;
}

export const AnalyticsContext = createContext<FoodContextType | undefined>(
  undefined
);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<GroupedFoods>({});
  const [nutritionTypes, setNutritionTypes] = useState<Set<string>>(() => {
    try {
      const storedData = localStorage.getItem("analyticsNutritionTypes");
      return storedData ? new Set<string>(JSON.parse(storedData) as Set<string>) : new Set();
    } catch (error) {
      return new Set();
    }
  });
  const [dateRange, setDateRange] = useState<DateRanges>(
    (localStorage.getItem('analyticsDateRange') as DateRanges) ||
      DateRanges.ThisWeek
  );

  const handleSetDateRange = (range: DateRanges) => {
    localStorage.setItem('analyticsDateRange', range);
    setDateRange(range);
  };

  const handleSetNutritionTypes = (type: string) => {
    setNutritionTypes(currVal => {
      const newVal = new Set<string>(currVal);
      newVal.has(type) ? newVal.delete(type) : newVal.add(type);
      
      localStorage.setItem('analyticsNutritionTypes', JSON.stringify(Array.from(newVal)));
      return newVal;
    });
  };


  const getDateRange = useCallback((range: DateRanges) => {
    const today = new Date();

    switch (range) {
      case DateRanges.ThisWeek:
        return { startDate: startOfWeek(today), endDate: endOfWeek(today) };
      case DateRanges.LastWeek:
        return {
          startDate: startOfWeek(subDays(today, 7)),
          endDate: endOfWeek(subDays(today, 7)),
        };
      case DateRanges.ThisMonth:
        return { startDate: startOfMonth(today), endDate: endOfMonth(today) };
      case DateRanges.LastMonth:
        return {
          startDate: startOfMonth(subDays(today, 30)),
          endDate: endOfMonth(subDays(today, 30)),
        };
      default:
        return { startDate: startOfWeek(today), endDate: endOfWeek(today) };
    }
  }, []);

  // Use useQuery to fetch foods with loading and error state handling
  const { startDate, endDate } = getDateRange(dateRange);
  const dateRangeStr = {
    startDate: datetimeToDate(startDate),
    endDate: datetimeToDate(endDate),
  };
  const { data: queryData, isFetching: dataIsFetching } = useQuery({
    queryKey: ['analytics', dateRangeStr],
    queryFn: async () => {
      return await convexClient.query(api.food.getAllForRange, dateRangeStr);
    },
    gcTime: Infinity,
    enabled: true,
  });

  useEffect(() => {
    if (queryData) {
      // Group foods by date
      const groupedFoods = queryData.reduce(
        (groups: GroupedFoods, food: FatsecretFoodData) => {
          const { date } = food;

          if (!groups[date]) {
            groups[date] = [];
          }

          groups[date].push(food);
          return groups;
        },
        {} as GroupedFoods
      );
      setData(groupedFoods);
    }
  }, [queryData]);

  const value = {
    data,
    dataIsFetching,
    dateRange,
    setDateRange: handleSetDateRange,
    nutritionTypes,
    setNutritionTypes: handleSetNutritionTypes,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error(
      'useAnalyticsContext must be used within a AnalyticsProvider'
    );
  }
  return context;
}
