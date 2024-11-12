import { AppleIcon, ChartNoAxesCombinedIcon, MonitorSmartphoneIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// main is for main navigation, other is for other purposes
export enum Types {
  Main = 'main', // trigger by hover - default behaviour
  Other = 'other', // trigger programmatically - omit hover
}
export type Path = {
  id: string;
  type: Types;
  name: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
};

export const useNavigation = () => {
  const pathname = usePathname();

  const paths = useMemo(() => {
    const _paths: Path[] = [
      {
        id: 'home',
        type: Types.Main,
        name: 'Home',
        href: '/home',
        icon: <AppleIcon />,
        active: pathname.startsWith('/home'),
      },
      {
        id: 'analytics',
        type: Types.Main,
        name: 'Analytics',
        href: '/analytics',
        icon: <ChartNoAxesCombinedIcon />,
        active: pathname.startsWith('/analytics'),
      },
      {
        id: 'installation',
        type: Types.Other,
        name: 'Installation',
        href: '/installation',
        icon: <MonitorSmartphoneIcon />,
        active: pathname === '/installation',
      },
    ];
    return _paths;
  }, [pathname]);

  return paths;
};
