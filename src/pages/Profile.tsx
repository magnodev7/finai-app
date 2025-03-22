import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      setMessage('Perfil atualizado com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmNewPassword) {
      setError('As novas senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar senha');
      }

      setMessage('Senha atualizada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError('Erro ao atualizar senha. Verifique sua senha atual.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900">Informações do Perfil</h2>
        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input mt-1 block w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input mt-1 block w-full"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Atualizar Perfil
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900">Alterar Senha</h2>
        <form onSubmit={handleUpdatePassword} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Senha Atual
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input mt-1 block w-full"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Nova Senha
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input mt-1 block w-full"
              />
            </div>

            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirme a Nova Senha
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="input mt-1 block w-full"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Atualizar Senha
            </button>
          </div>
        </form>
      </div>

      {message && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}