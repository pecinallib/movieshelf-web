import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/ui/SearchBar';
import { MediaCard } from '../../components/ui/MediaCard';
import { CardGridSkeleton } from '../../components/ui/Skeleton';
import { AnimatedPage, AnimatedItem } from '../../components/ui/AnimatedPage';
import { getTrending, getGenres, discoverMedia } from '../../services/tmdb';
import { TMDBResult } from '../../types/tmdb';
import { Film, Tv, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHead from '../../components/PageHead';

interface Genre {
  id: number;
  name: string;
}

export function Home() {
  const [results, setResults] = useState<TMDBResult[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediaType, setMediaType] = useState<'all' | 'movie' | 'tv'>('all');
  const [selectedGenre, setSelectedGenre] = useState<'trending' | number>(
    'trending',
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Carrega gêneros quando muda o tipo
  useEffect(() => {
    if (mediaType === 'all') {
      setGenres([]);
      return;
    }
    getGenres(mediaType)
      .then((data: { genres: Genre[] }) => setGenres(data.genres))
      .catch(console.error);
  }, [mediaType]);

  // Reset gênero quando muda tipo
  useEffect(() => {
    setSelectedGenre('trending');
    setPage(1);
  }, [mediaType]);

  // Carrega conteúdo
  useEffect(() => {
    setLoading(true);

    if (selectedGenre === 'trending') {
      const trendingType = mediaType === 'all' ? 'all' : mediaType;
      getTrending(trendingType, 'week')
        .then((data) => {
          const filtered = data.results.filter(
            (item: TMDBResult) =>
              item.media_type === 'movie' || item.media_type === 'tv',
          );
          setResults(filtered);
          setTotalPages(1);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      const type = mediaType === 'all' ? 'movie' : mediaType;
      discoverMedia(type, selectedGenre as number, page)
        .then((data: { results: TMDBResult[]; total_pages: number }) => {
          const withType = data.results.map((item: TMDBResult) => ({
            ...item,
            media_type: type,
          }));
          if (page === 1) {
            setResults(withType);
          } else {
            setResults((prev) => [...prev, ...withType]);
          }
          setTotalPages(data.total_pages);
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
          setLoadingMore(false);
        });
    }
  }, [mediaType, selectedGenre, page]);

  function handleTypeChange(type: 'all' | 'movie' | 'tv') {
    setMediaType(type);
  }

  function handleGenreChange(genreId: 'trending' | number) {
    setSelectedGenre(genreId);
    setPage(1);
  }

  function handleLoadMore() {
    setLoadingMore(true);
    setPage((p) => p + 1);
  }

  const sectionTitle =
    selectedGenre === 'trending'
      ? 'Em Alta'
      : genres.find((g) => g.id === selectedGenre)?.name || 'Explorar';

  return (
    <AnimatedPage className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <PageHead title="Início" description="Descubra filmes e séries" />
        {/* Header + Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
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

        {/* Type Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex gap-3 mb-4"
        >
          {[
            { type: 'all' as const, label: 'Todos', icon: TrendingUp },
            { type: 'movie' as const, label: 'Filmes', icon: Film },
            { type: 'tv' as const, label: 'Séries', icon: Tv },
          ].map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                mediaType === type
                  ? 'btn-gold'
                  : 'bg-[#18181f] text-zinc-300 border border-[#27272f] hover:border-gold-300/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Genre Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => handleGenreChange('trending')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedGenre === 'trending'
                ? 'bg-gold-300/20 text-gold-300 border border-gold-300/30'
                : 'bg-[#18181f] text-zinc-400 border border-[#27272f] hover:border-gold-300/30'
            }`}
          >
            Em Alta
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedGenre === genre.id
                  ? 'bg-gold-300/20 text-gold-300 border border-gold-300/30'
                  : 'bg-[#18181f] text-zinc-400 border border-[#27272f] hover:border-gold-300/30'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </motion.div>

        {/* Section Title */}
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-gold-300" />
          <h2 className="text-xl font-semibold text-white">{sectionTitle}</h2>
        </div>

        {/* Results */}
        {loading ? (
          <CardGridSkeleton count={10} />
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((item, index) => (
                <AnimatedItem
                  key={`${item.media_type}-${item.id}-${index}`}
                  index={index % 10}
                >
                  <MediaCard item={item} />
                </AnimatedItem>
              ))}
            </div>

            {selectedGenre !== 'trending' && page < totalPages && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 btn-gold rounded-xl font-medium transition-colors cursor-pointer"
                >
                  {loadingMore ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-zinc-400">
            Nenhum resultado encontrado
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
