import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Transações', href: '/transactions', icon: ArrowsRightLeftIcon },
  { name: 'Análise', href: '/analysis', icon: ChartBarIcon },
  { name: 'Perfil', href: '/profile', icon: UserIcon },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    {
                      'text-primary bg-primary/10': isActive,
                      'text-gray-700 hover:text-primary hover:bg-primary/5': !isActive,
                    }
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}