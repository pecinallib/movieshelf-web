import { useEffect, useState } from 'react';
import {
  createReview,
  getReview,
  updateReview,
  deleteReview,
} from '../../services/reviews';
import { Star, Trash2 } from 'lucide-react';

interface ReviewFormProps {
  tmdbId: number;
  mediaType: string;
}

export function ReviewForm({ tmdbId, mediaType }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [existingReview, setExistingReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getReview(tmdbId, mediaType)
      .then((review) => {
        setRating(review.rating);
        setComment(review.comment || '');
        setExistingReview(true);
      })
      .catch(() => {
        // Sem review ainda
      });
  }, [tmdbId, mediaType]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setLoading(true);

    try {
      if (existingReview) {
        await updateReview(tmdbId, mediaType, {
          rating,
          comment: comment || undefined,
        });
      } else {
        await createReview({
          tmdbId,
          mediaType,
          rating,
          comment: comment || undefined,
        });
        setExistingReview(true);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar review:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Remover sua review?')) return;
    try {
      await deleteReview(tmdbId, mediaType);
      setRating(0);
      setComment('');
      setExistingReview(false);
    } catch (error) {
      console.error('Erro ao remover review:', error);
    }
  }

  return (
    <div className="bg-[#0f0f14] border border-[#27272f] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          {existingReview ? 'Sua Review' : 'Avaliar'}
        </h2>
        {existingReview && (
          <button
            onClick={handleDelete}
            className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="cursor-pointer"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  i < (hoverRating || rating)
                    ? 'text-gold-300 fill-gold-300'
                    : 'text-zinc-700'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-zinc-400 text-sm ml-2">{rating}/5</span>
          )}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escreva um comentário (opcional)"
          rows={3}
          className="w-full px-4 py-3 bg-[#18181f] border border-[#27272f] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold-300 transition-colors resize-none"
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || rating === 0}
            className="px-6 py-2 btn-gold disabled:bg-zinc-700 disabled:bg-none rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            {loading ? 'Salvando...' : existingReview ? 'Atualizar' : 'Enviar'}
          </button>
          {saved && (
            <span className="text-green-400 text-sm">Salvo com sucesso!</span>
          )}
        </div>
      </form>
    </div>
  );
}
