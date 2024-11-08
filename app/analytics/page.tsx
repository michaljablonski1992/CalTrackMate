'use client';

import { AnalyticsProvider } from '@/context/AnalyticsContext';
import Chart from './_components/Chart';
import DataPicker from './_components/DataPicker';

export default function Analytics() {
  return (
    <div className="lg:h-full w-full">
      <div className="grid gap-3 grid-cols-1 lg:grid-rows-10 lg:grid-flow-col lg:gap-4 leading-10 h-full">
        <AnalyticsProvider>
          <DataPicker />
          <Chart />
        </AnalyticsProvider>
      </div>
    </div>
  );
}
