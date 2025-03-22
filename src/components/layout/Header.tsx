import { useAuth } from '@/hooks/useAuth';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900">FinAI</h1>
      </div>

      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            {user?.name.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-700">{user?.name}</span>
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={`${
                  active ? 'bg-gray-100' : ''
                } block px-4 py-2 text-sm text-gray-700`}
              >
                Perfil
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={logout}
                className={`${
                  active ? 'bg-gray-100' : ''
                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
              >
                Sair
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </header>
  );
}