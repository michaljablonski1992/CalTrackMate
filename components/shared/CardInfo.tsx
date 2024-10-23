import { LucideIcon } from 'lucide-react';

interface Props {
  text: string;
  mode?: string;
  icon?: LucideIcon;
  className?: string;
}

const CardInfo = ({ text, mode = 'normal', icon: InfoIcon, className }: Props) => {
  const textColor = (mode === 'danger') ? 'text-destructive' : 'text-muted-foreground'

  return (
    <div className={`flex items-center justify-center flex-col ${textColor} ${className || ''}`}>
      <p className="text-2xl">{text}</p>
      {InfoIcon && <InfoIcon style={{ width: '4rem', height: '4rem' }} />}
    </div>
  );
};

export default CardInfo;
