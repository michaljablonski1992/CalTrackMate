import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  labelIcon: LucideIcon;
  titleContent?: React.ReactNode;
  gridClasses: string;
  children: React.ReactNode;
}
function CardWrapper({
  label,
  labelIcon: LabelIcon,
  titleContent,
  gridClasses,
  children,
}: Props): React.ReactElement {
  return (
    <Card className={`flex flex-col w-full h-full rounded-xl ${gridClasses}`}>
      <CardHeader className='flex flex-col'>
        <CardTitle className="text-primary">
          <div className="flex items-center gap-2">
            <LabelIcon className="size-5" />
            {label}
          </div>
        </CardTitle>
        {titleContent}
      </CardHeader>
      <CardContent className='flex-grow lg:min-h-0 lg:max-h-full overflow-auto'>
        <div className={`grid gap-3 grid-flow-col lg:h-full h-96`}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

export default CardWrapper;
