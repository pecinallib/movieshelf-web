import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/ui/SearchBar';
import { MediaCard } from '../../components/ui/MediaCard';
import { getTrending } from '../../services/tmdb';
import { TMDBResult } from '../../types/tmdb';
import { TrendingUp } from 'lucide-react';

export function Home() {
  const [trending, setTrending] = useState<TMDBResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrending()
      .then((data) => {
        const filtered = data.results.filter(
          (item: TMDBResult) =>
            item.media_type === 'movie' || item.media_type === 'tv',
        );
        setTrending(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Descubra filmes e séries
          </h1>
          <p className="text-zinc-400 mb-8">
            Busque, favorite e organize seus títulos preferidos
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-gold-300" />
            <h2 className="text-xl font-semibold text-white">
              Em alta esta semana
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12 text-zinc-400">Carregando...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trending.map((item) => (
                <MediaCard key={`${item.media_type}-${item.id}`} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
