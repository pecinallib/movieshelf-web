import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, ProfileData } from '../../services/profile';
import { useAuth } from '../../contexts/AuthContext';
import { AnimatedPage } from '../../components/ui/AnimatedPage';
import { User, Heart, Star, List, LogOut, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailsSkeleton } from '../../components/ui/Skeleton';
import PageHead from '../../components/PageHead';

export function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-400">
        Erro ao carregar perfil
      </div>
    );
  }

  const memberSince = new Date(profile.createdAt).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const stats = [
    {
      label: 'Favoritos',
      value: profile._count.favorites,
      icon: Heart,
      color: 'text-red-400',
    },
    {
      label: 'Reviews',
      value: profile._count.reviews,
      icon: Star,
      color: 'text-gold-300',
    },
    {
      label: 'Listas',
      value: profile._count.lists,
      icon: List,
      color: 'text-purple-400',
    },
  ];

  return (
    <AnimatedPage className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <PageHead
          title="Perfil"
          description="Veja suas informações e estatísticas"
        />
        {/* Avatar + Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0f0f14] border border-[#27272f] rounded-2xl p-8 text-center mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gold-300/10 border-2 border-gold-300/30 flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-gold-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{profile.name}</h1>
          <p className="text-zinc-400 text-sm mb-3">{profile.email}</p>
          <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs">
            <Calendar className="w-3 h-3" />
            <span>Membro desde {memberSince}</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-[#0f0f14] border border-[#27272f] rounded-2xl p-6 text-center"
            >
              <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-zinc-400 text-xs mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0f0f14] border border-[#27272f] rounded-2xl text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair da conta</span>
          </button>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
