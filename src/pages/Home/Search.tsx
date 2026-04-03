import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMedia } from '../../services/tmdb';
import { MediaCard } from '../../components/ui/MediaCard';
import { SearchBar } from '../../components/ui/SearchBar';
import { CardGridSkeleton } from '../../components/ui/Skeleton';
import { AnimatedPage, AnimatedItem } from '../../components/ui/AnimatedPage';
import { TMDBResult } from '../../types/tmdb';
import { Search as SearchIcon } from 'lucide-react';
import PageHead from '../../components/PageHead';

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<TMDBResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setPage(1);

    searchMedia(query, 1)
      .then((data) => {
        const filtered = data.results.filter(
          (item: TMDBResult) =>
            item.media_type === 'movie' || item.media_type === 'tv',
        );
        setResults(filtered);
        setTotalPages(data.total_pages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);

    searchMedia(query, nextPage)
      .then((data) => {
        const filtered = data.results.filter(
          (item: TMDBResult) =>
            item.media_type === 'movie' || item.media_type === 'tv',
        );
        setResults((prev) => [...prev, ...filtered]);
      })
      .catch(console.error);
  }

  return (
    <AnimatedPage className="min-h-screen bg-[#09090b] px-4 py-8">
      <PageHead title="Sua Busca" description="Procure por filmes e séries" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <SearchBar />
        </div>

        {query && (
          <div className="flex items-center gap-2 mb-6">
            <SearchIcon className="w-5 h-5 text-gold-300" />
            <h2 className="text-xl font-semibold text-white">
              Resultados para "{query}"
            </h2>
          </div>
        )}

        {loading ? (
          <CardGridSkeleton count={10} />
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((item, index) => (
                <AnimatedItem
                  key={`${item.media_type}-${item.id}`}
                  index={index}
                >
                  <MediaCard item={item} />
                </AnimatedItem>
              ))}
            </div>

            {page < totalPages && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 btn-gold rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Carregar mais
                </button>
              </div>
            )}
          </>
        ) : query ? (
          <div className="text-center py-12 text-zinc-400">
            Nenhum resultado encontrado
          </div>
        ) : null}
      </div>
    </AnimatedPage>
  );
}
