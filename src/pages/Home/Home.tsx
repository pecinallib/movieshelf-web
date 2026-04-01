import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/ui/SearchBar';
import { MediaCard } from '../../components/ui/MediaCard';
import { CardGridSkeleton } from '../../components/ui/Skeleton';
import { AnimatedPage, AnimatedItem } from '../../components/ui/AnimatedPage';
import { getTrending } from '../../services/tmdb';
import { TMDBResult } from '../../types/tmdb';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <AnimatedPage className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Descubra filmes e séries
          </h1>
          <p className="text-zinc-400 mb-8">
            Busque, favorite e organize seus títulos preferidos
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </motion.div>

        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <TrendingUp className="w-5 h-5 text-gold-300" />
            <h2 className="text-xl font-semibold text-white">
              Em alta esta semana
            </h2>
          </motion.div>

          {loading ? (
            <CardGridSkeleton count={10} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trending.map((item, index) => (
                <AnimatedItem
                  key={`${item.media_type}-${item.id}`}
                  index={index}
                >
                  <MediaCard item={item} />
                </AnimatedItem>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
