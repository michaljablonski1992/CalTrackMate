import CardWrapper from '@/components/shared/CardWrapper';
import { CookingPotIcon, TrendingUpDownIcon } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useAnalyticsContext } from '@/context/AnalyticsContext';
import Spinner from '@/components/shared/Spinner';
import CardInfo from '@/components/shared/CardInfo';
import { getNutritionValues, transformKeyToString } from '@/lib/utils';
import {
  FatsecretServingValues,
  servingValuesUnits,
} from '@/lib/fatsecret/api';

const Chart = () => {
  const analyticsCtx = useAnalyticsContext();
  const nutritionTypes = Array.from(analyticsCtx.nutritionTypes).filter(x => Object.keys(servingValuesUnits).includes(x));

  const chartConfig = Object.keys(servingValuesUnits).reduce(
    (acc, key, index) => {
      acc[key] = {
        label: `${transformKeyToString(key)}(${servingValuesUnits[key as keyof FatsecretServingValues]})`,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    },
    {} as ChartConfig
  ) satisfies ChartConfig;

  const mappedData = Object.entries(analyticsCtx.data).map(([date, data]) => ({
    date,
    ...getNutritionValues(data),
  }));

  return (
    <CardWrapper
      label="Nutritional Data Overview"
      labelIcon={TrendingUpDownIcon}
      gridClasses="lg:row-span-7"
    >
      {analyticsCtx.dataIsFetching && <Spinner />}
      {!analyticsCtx.dataIsFetching &&
        (Object.keys(analyticsCtx.data).length === 0 || nutritionTypes.length === 0) && (
          <CardInfo
            text="There is no data for chosen filters"
            icon={CookingPotIcon}
          />
        )}
      {!analyticsCtx.dataIsFetching &&
        Object.keys(analyticsCtx.data).length > 0 && (
          <ChartContainer
            className="min-h-[200px] max-h-full min-w-[600px] max-w-full w-full"
            config={chartConfig}
          >
            <AreaChart
              accessibilityLayer
              data={mappedData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <defs>
                {nutritionTypes.map((key) => {
                  return (
                    <linearGradient
                      key={key}
                      id={`fill${key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={`var(--color-${key})`}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={`var(--color-${key})`}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  );
                })}
              </defs>
              {nutritionTypes.map((key) => {
                return (
                  <Area
                    key={key}
                    dataKey={key}
                    type="natural"
                    fill={`url(#fill${key})`}
                    fillOpacity={0.4}
                    stroke={`var(--color-${key})`}
                    stackId="a"
                  />
                );
              })}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
    </CardWrapper>
  );
};

export default Chart;
