import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Film } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/');
    } catch {
      setError('Erro ao criar conta. Tente outro email.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="w-10 h-10 text-gold-300" />
            <span className="gold-shimmer font-bold text-3xl">MovieShelf</span>
          </div>
          <p className="text-zinc-400">Crie sua conta</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0f0f14] border border-[#27272f] rounded-2xl p-8 space-y-6"
        >
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-zinc-300 text-sm mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Seu nome"
              className="w-full px-4 py-3 bg-[#18181f] border border-[#27272f] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold-300 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-300 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-[#18181f] border border-[#27272f] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold-300 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-300 text-sm mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-3 bg-[#18181f] border border-[#27272f] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold-300 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 btn-gold disabled:bg-zinc-700 disabled:bg-none rounded-xl transition-colors cursor-pointer"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>

          <p className="text-center text-zinc-400 text-sm">
            Já tem conta?{' '}
            <Link to="/login" className="text-gold-300 hover:text-gold-200">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
