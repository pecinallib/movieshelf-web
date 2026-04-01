import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listFavorites } from '../../services/favorites';
import { Favorite } from '../../types/models';
import { Heart } from 'lucide-react';
import { AnimatedPage, AnimatedItem } from '../../components/ui/AnimatedPage';
import { CardGridSkeleton } from '../../components/ui/Skeleton';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const type = filter === 'all' ? undefined : filter;
    setLoading(true);
    listFavorites(type)
      .then(setFavorites)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <AnimatedPage className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Meus Favoritos</h1>
        </div>

        <div className="flex gap-3 mb-8">
          {['all', 'movie', 'tv'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                filter === type
                  ? 'btn-gold'
                  : 'bg-[#18181f] text-zinc-300 border border-[#27272f] hover:border-gold-300/50'
              }`}
            >
              {type === 'all'
                ? 'Todos'
                : type === 'movie'
                  ? 'Filmes'
                  : 'Séries'}
            </button>
          ))}
        </div>

        {loading ? (
          <CardGridSkeleton count={10} />
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((fav, index) => (
              <AnimatedItem key={fav.id} index={index}>
                <Link
                  key={fav.id}
                  to={`/${fav.mediaType}/${fav.tmdbId}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-[#0f0f14] border border-[#27272f] hover:border-gold-300/50 transition-all duration-300">
                    {fav.posterPath ? (
                      <img
                        src={`${IMG_BASE}${fav.posterPath}`}
                        alt={fav.title}
                        className="w-full aspect-2/3 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full aspect-2/3 bg-[#18181f] flex items-center justify-center text-zinc-500 text-sm">
                        Sem imagem
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4">
                      <h3 className="text-white font-semibold text-sm truncate">
                        {fav.title}
                      </h3>
                      <span className="inline-block mt-1 px-2 py-0.5 badge-gold text-xs rounded-full">
                        {fav.mediaType === 'movie' ? 'Filme' : 'Série'}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                    </div>
                  </div>
                </Link>
              </AnimatedItem>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400">Nenhum favorito ainda</p>
            <Link
              to="/"
              className="text-gold-300 hover:text-gold-200 text-sm mt-2 inline-block"
            >
              Explorar filmes e séries
            </Link>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
