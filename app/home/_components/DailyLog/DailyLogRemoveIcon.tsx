import TooltipWrapper, {
  TooltipWrapperTypes,
} from '@/components/shared/TooltipWrapper';
import { Trash2Icon } from 'lucide-react';

interface Props {
  className?: string;
  onClickHandler: () => void;
  ariaLabel: string;
}

const DailyLogRemoveIcon = ({ className, onClickHandler, ariaLabel, ...props }: Props) => {
  return (
    <>
      <TooltipWrapper type={TooltipWrapperTypes.Danger} tooltipContent="Remove">
        <button onClick={onClickHandler} aria-label={ariaLabel}>
          <Trash2Icon
            {...props}
            className={`text-destructive cursor-pointer ${className || ''}`}
          />
        </button>
      </TooltipWrapper>
    </>
  );
};

export default DailyLogRemoveIcon;
