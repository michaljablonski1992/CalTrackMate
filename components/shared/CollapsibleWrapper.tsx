import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import { ChevronsRightIcon } from 'lucide-react';
import css from './CollapsibleWrapper.module.css';

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const CollapsibleWrapper = ({ trigger, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex gap-2">
        {
          <ChevronsRightIcon
            className={`${css.collapsibleIcon} ${isOpen ? css.open : ''} mt-2`}
          />
        }
        {trigger}
      </CollapsibleTrigger>
      <CollapsibleContent className={css.collapsibleContent}>{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleWrapper;
