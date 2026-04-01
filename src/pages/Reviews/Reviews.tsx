import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listMyReviews, deleteReview } from '../../services/reviews';
import { Review } from '../../types/models';
import { Star, Trash2 } from 'lucide-react';
import { AnimatedPage, AnimatedItem } from '../../components/ui/AnimatedPage';

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  function loadReviews() {
    const type = filter === 'all' ? undefined : filter;
    setLoading(true);
    listMyReviews(type)
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadReviews();
  }, [filter]);

  async function handleDelete(tmdbId: number, mediaType: string) {
    if (!confirm('Remover esta review?')) return;
    try {
      await deleteReview(tmdbId, mediaType);
      loadReviews();
    } catch (error) {
      console.error('Erro ao deletar review:', error);
    }
  }

  return (
    <AnimatedPage className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Star className="w-6 h-6 text-gold-300" />
          <h1 className="text-2xl font-bold text-white">Minhas Reviews</h1>
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
          <div className="text-center py-12 text-zinc-400">Carregando...</div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <AnimatedItem
                key={review.id}
                className="bg-[#0f0f14] border border-[#27272f] rounded-2xl p-6 hover:border-gold-300/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <Link
                    to={`/${review.mediaType}/${review.tmdbId}`}
                    className="flex-1"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-gold-300 fill-gold-300'
                                : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="px-2 py-0.5 badge-gold text-xs rounded-full">
                        {review.mediaType === 'movie' ? 'Filme' : 'Série'}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-zinc-300 text-sm">{review.comment}</p>
                    )}
                    <p className="text-zinc-500 text-xs mt-2">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(review.tmdbId, review.mediaType)
                    }
                    className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </AnimatedItem>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400">Nenhuma review ainda</p>
            <Link
              to="/"
              className="text-gold-300 hover:text-gold-200 text-sm mt-2 inline-block"
            >
              Explorar filmes e séries para avaliar
            </Link>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
