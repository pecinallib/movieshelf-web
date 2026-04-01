import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Film, Heart, List, Star, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="bg-[#0f0f14] border-b border-[#27272f] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Film className="w-6 h-6 text-gold-300" />
          <span className="text-gold-metallic">MovieShelf</span>
        </Link>

        {isAuthenticated && (
          <>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-zinc-400 hover:text-gold-300 transition-colors text-sm"
              >
                Início
              </Link>
              <Link
                to="/favorites"
                className="text-zinc-400 hover:text-gold-300 transition-colors text-sm flex items-center gap-1"
              >
                <Heart className="w-4 h-4" />
                Favoritos
              </Link>
              <Link
                to="/lists"
                className="text-zinc-400 hover:text-gold-300 transition-colors text-sm flex items-center gap-1"
              >
                <List className="w-4 h-4" />
                Listas
              </Link>
              <Link
                to="/reviews"
                className="text-zinc-400 hover:text-gold-300 transition-colors text-sm flex items-center gap-1"
              >
                <Star className="w-4 h-4" />
                Reviews
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <span className="text-zinc-400 text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-zinc-300 cursor-pointer"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </>
        )}
      </div>

      {menuOpen && isAuthenticated && (
        <nav className="md:hidden bg-[#0f0f14] border-t border-[#27272f] px-4 py-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-zinc-300 hover:text-gold-300 transition-colors"
          >
            Início
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="text-zinc-300 hover:text-gold-300 transition-colors flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Favoritos
          </Link>
          <Link
            to="/lists"
            onClick={() => setMenuOpen(false)}
            className="text-zinc-300 hover:text-gold-300 transition-colors flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            Listas
          </Link>
          <Link
            to="/reviews"
            onClick={() => setMenuOpen(false)}
            className="text-zinc-300 hover:text-gold-300 transition-colors flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Reviews
          </Link>
          <div className="flex items-center gap-2 text-zinc-300">
            <ThemeToggle />
            <span className="text-sm">Tema</span>
          </div>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="text-red-400 flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </nav>
      )}
    </header>
  );
}
