import { DateRanges, useAnalyticsContext } from '@/context/AnalyticsContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import CardWrapper from '@/components/shared/CardWrapper';
import { FilterIcon } from 'lucide-react';
import { servingValuesUnits } from '@/lib/fatsecret/api';
import { transformKeyToString } from '@/lib/utils';

const DataPicker = () => {
  const analyticsCtx = useAnalyticsContext();

  return (
    <CardWrapper
      label="Filter Nutritional Data"
      labelIcon={FilterIcon}
      gridClasses="lg:row-span-3"
    >
      <div className="grid lg:grid-cols-3 grid-flow-row">
        <ToggleGroup
          defaultValue={analyticsCtx.dateRange}
          className="customGroup lg:col-span-1"
          size="lg"
          variant="outline"
          type="single"
        >
          {Object.values(DateRanges).map((range) => (
            <ToggleGroupItem
              key={range}
              onClick={() => analyticsCtx.setDateRange(range)}
              value={range}
              aria-label={`Toggle ${range}`}
            >
              {range}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ToggleGroup
          className="customGroup lg:col-span-2 flex flex-wrap"
          size="lg"
          variant="outline"
          type='multiple'
        >
          {Object.keys(servingValuesUnits).map((d) => (
            <ToggleGroupItem
              key={d}
              onClick={() => analyticsCtx.setNutritionTypes(d)}
              value={d}
              data-state={analyticsCtx.nutritionTypes.has(d) ? 'on' : 'off'}
              aria-label={`Toggle ${d}`}
            >
              {transformKeyToString(d)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </CardWrapper>
  );
};

export default DataPicker;
