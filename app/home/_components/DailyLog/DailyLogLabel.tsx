import { DatePicker } from '@/components/shared/DatePicker';

const DailyLogLabel = () => {
  return (
    <div className="flex items-center justify-items-stretch w-full">
      <div className='flex-none'>Daily Log</div> 
      <div className='grow px-2 py-1 lg:px-4 lg:py-2'>{<DatePicker />}</div>
    </div>
  );
};

export default DailyLogLabel;
