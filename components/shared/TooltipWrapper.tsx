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
  Danger = 'Danger', // Error - different styling and side
}
export enum TooltipWrapperSides {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left'
}
interface Props {
  mode?: TooltipWrapperMods;
  type?: TooltipWrapperTypes;
  tooltipContent: React.ReactNode;
  open?: boolean;
  side?: TooltipWrapperSides;
  children: React.ReactNode;
}

const TooltipWrapper = ({
  mode = TooltipWrapperMods.Auto,
  type = TooltipWrapperTypes.Info,
  tooltipContent,
  open,
  side = TooltipWrapperSides.Top,
  children,
}: Props) => {
  let className;
  if (type === TooltipWrapperTypes.Danger) {
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
