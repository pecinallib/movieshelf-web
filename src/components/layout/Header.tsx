import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Film,
  Heart,
  List,
  Star,
  LogOut,
  Menu,
  X,
  Home,
  User,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloqueia scroll do body quando menu tá aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const navLinks = [
    { to: '/', label: 'Início', icon: Home },
    { to: '/favorites', label: 'Favoritos', icon: Heart },
    { to: '/lists', label: 'Listas', icon: List },
    { to: '/reviews', label: 'Reviews', icon: Star },
  ];

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  return (
    <>
      <header className="bg-[#0f0f14] border-b border-[#27272f] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Film className="w-6 h-6 text-gold-300" />
            <span className="text-gold-metallic">MovieShelf</span>
          </Link>

          {isAuthenticated && (
            <>
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`text-sm flex items-center gap-1 transition-colors ${
                      isActive(to)
                        ? 'text-gold-300'
                        : 'text-zinc-400 hover:text-gold-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <Link
                  to="/profile"
                  className="text-zinc-400 hover:text-gold-300 text-sm transition-colors"
                >
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden text-zinc-300 cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Mobile Sidebar Modal */}
      {isAuthenticated && (
        <div
          className={`fixed inset-0 z-100 md:hidden transition-opacity duration-300 ${
            menuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Sidebar */}
          <div
            className={`absolute top-0 right-0 h-full w-72 bg-[#0f0f14] border-l border-[#27272f] shadow-2xl transition-transform duration-300 ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header do sidebar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#27272f]">
              <Link
                to="/profile"
                className="flex items-center gap-3"
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-gold-300/10 border border-gold-300/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-gold-300" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{user?.name}</p>
                  <p className="text-zinc-500 text-xs">{user?.email}</p>
                </div>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-3 py-4 space-y-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive(to)
                      ? 'bg-gold-300/10 text-gold-300 border border-gold-300/20'
                      : 'text-zinc-300 hover:bg-[#18181f] hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="mx-6 h-px bg-[#27272f]" />

            {/* Settings */}
            <div className="px-3 py-4 space-y-1">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl text-zinc-300">
                <span className="text-sm font-medium">Tema</span>
                <ThemeToggle />
              </div>
            </div>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-4 border-t border-[#27272f]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sair da conta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
