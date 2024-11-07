import TooltipWrapper from '@/components/shared/TooltipWrapper';
import { SquarePenIcon } from 'lucide-react';


interface Props {
  className?: string;
  onClickHandler: () => void;
}

const DailyLogServingEditIcon = ({ className, onClickHandler, ...props }: Props) => {
  return (
    <>
      <TooltipWrapper tooltipContent="Edit">
        <button onClick={onClickHandler} aria-label='Edit serving'>
          <SquarePenIcon
            {...props}
            className={`cursor-pointer ${className || ''}`}
          />
        </button>
      </TooltipWrapper>
    </>
  );
};

export default DailyLogServingEditIcon;
