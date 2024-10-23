import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export enum TooltipWrapperMods {
  Auto = 'Auto', // trigger by hover - default behaviour
  Manual = 'Manual', // trigger programmatically - omit hover
}
export enum TooltipWrapperTypes {
  Info = 'Info', // Info - default behaviou
  Error = 'Error', // Error - different styling and side
}
interface Props {
  mode?: TooltipWrapperMods;
  type?: TooltipWrapperTypes;
  tooltipContent: React.ReactNode;
  open?: boolean;
  children: React.ReactNode;
}

const TooltipWrapper = ({
  mode = TooltipWrapperMods.Auto,
  type = TooltipWrapperTypes.Info,
  tooltipContent,
  open,
  children,
}: Props) => {
  let side: 'top' | 'right' | 'bottom' | 'left' = 'top';
  let className;
  if (type === TooltipWrapperTypes.Error) {
    side = 'right';
    className = 'text-destructive bg-destructive-foreground';
  }

  return (
    <TooltipProvider>
      <Tooltip open={mode === TooltipWrapperMods.Manual ? open : undefined}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className={className}>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
