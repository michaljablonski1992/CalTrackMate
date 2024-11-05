import { DatePicker } from '@/components/shared/DatePicker';

const DailyLogLabel = () => {
  return (
    <div className="flex items-center justify-items-stretch w-full">
      <div className='flex-none'>Daily Log</div> 
      <div className='grow'>{<DatePicker />}</div>
    </div>
  );
};

export default DailyLogLabel;
