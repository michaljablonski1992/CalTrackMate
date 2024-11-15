import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface Props {
  label: React.ReactNode;
  labelIcon: LucideIcon;
  titleContent?: React.ReactNode;
  gridClasses?: string;
  contentClasses?: string;
  children: React.ReactNode;
}
function CardWrapper({
  label,
  labelIcon: LabelIcon,
  titleContent,
  gridClasses,
  contentClasses,
  children,
}: Props): React.ReactElement {
  return (
    <Card className={`flex flex-col w-full h-full rounded-xl ${gridClasses || ''}`}>
      <CardHeader className='flex flex-col lg:p-6 p-4'>
        <CardTitle className="text-primary">
          <div className="flex items-center gap-2">
            <LabelIcon className="size-5" />
            {label}
          </div>
        </CardTitle>
        {titleContent}
      </CardHeader>
      <CardContent className='lg:p-6 p-4 flex-grow lg:min-h-0 lg:max-h-full overflow-auto'>
        <div className={`grid gap-3 grid-flow-col lg:h-full ${contentClasses || ''}`}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

export default CardWrapper;
