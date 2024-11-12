import { DateRanges, useAnalyticsContext } from '@/context/AnalyticsContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import CardWrapper from '@/components/shared/CardWrapper';
import { FilterIcon } from 'lucide-react';
import { servingValuesUnits } from '@/lib/fatsecret/api';
import { transformKeyToString } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const DataPicker = () => {
  const analyticsCtx = useAnalyticsContext();

  return (
    <>
      <CardWrapper
        label="Filter Date Range"
        labelIcon={FilterIcon}
        gridClasses="lg:row-span-2 lg:col-span-3"
      >
        <ScrollArea type="always">
          <ToggleGroup
            defaultValue={analyticsCtx.dateRange}
            className="customGroup grid grid-cols-2 grid-rows-2 2xl:px-10 lg:px-4 m-auto"
            size="lg"
            variant="outline"
            type="single"
          >
            {Object.values(DateRanges).map((range) => (
              <ToggleGroupItem
                key={range}
                onClick={() => analyticsCtx.setDateRange(range)}
                value={range}
                className='h-9'
                aria-label={`Toggle ${range}`}
              >
                {range}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ScrollArea>
      </CardWrapper>
      <CardWrapper
        label="Filter Type"
        labelIcon={FilterIcon}
        gridClasses="lg:row-span-2 lg:col-span-7 lg:col-start-4"
      >
        <ScrollArea type="always">
          <ToggleGroup
            className="customGroup flex flex-wrap"
            size="lg"
            variant="outline"
            type="multiple"
          >
            {Object.keys(servingValuesUnits).map((d) => (
              <ToggleGroupItem
                key={d}
                onClick={() => analyticsCtx.setNutritionTypes(d)}
                value={d}
                className='h-9'
                data-state={analyticsCtx.nutritionTypes.has(d) ? 'on' : 'off'}
                aria-label={`Toggle ${d}`}
              >
                {transformKeyToString(d)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ScrollArea>
      </CardWrapper>
    </>
  );
};

export default DataPicker;
