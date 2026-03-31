import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Film, Heart, List, Star, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-xl"
        >
          <Film className="w-6 h-6 text-purple-500" />
          MovieShelf
        </Link>

        {isAuthenticated && (
          <>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                Início
              </Link>
              <Link
                to="/favorites"
                className="text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <Heart className="w-4 h-4" />
                Favoritos
              </Link>
              <Link
                to="/lists"
                className="text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <List className="w-4 h-4" />
                Listas
              </Link>
              <Link
                to="/reviews"
                className="text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <Star className="w-4 h-4" />
                Reviews
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <span className="text-slate-400 text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-300 cursor-pointer"
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
        <nav className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Início
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Favoritos
          </Link>
          <Link
            to="/lists"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            Listas
          </Link>
          <Link
            to="/reviews"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Reviews
          </Link>
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
