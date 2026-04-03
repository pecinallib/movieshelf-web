import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdb';
import {
  addFavorite,
  removeFavorite,
  checkFavorite,
} from '../../services/favorites';
import { AddToList } from '../../components/ui/AddToList';
import { ReviewForm } from '../../components/ui/ReviewForm';
import { Heart, Star, Play, ArrowLeft } from 'lucide-react';
import { AnimatedPage } from '../../components/ui/AnimatedPage';
import { DetailsSkeleton } from '../../components/ui/Skeleton';
import { motion } from 'framer-motion';
import PageHead from '../../components/PageHead';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

export function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const movieId = Number(id);

    Promise.all([getMovieDetails(movieId), checkFavorite(movieId, 'movie')])
      .then(([details, favStatus]) => {
        setMovie(details);
        setIsFavorite(favStatus);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  async function toggleFavorite() {
    if (!movie) return;
    setFavLoading(true);

    try {
      if (isFavorite) {
        await removeFavorite(movie.id, 'movie');
        setIsFavorite(false);
      } else {
        await addFavorite({
          tmdbId: movie.id,
          mediaType: 'movie',
          title: movie.title,
          posterPath: movie.poster_path,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
    } finally {
      setFavLoading(false);
    }
  }

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-400">
        Filme não encontrado
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube',
  );

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '';

  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;
  const duration = movie.runtime ? `${hours}h ${minutes}min` : '';

  return (
    <AnimatedPage className="min-h-screen bg-[#09090b]">
      {movie.backdrop_path && (
        <div className="relative h-100 w-full">
          <PageHead
            title="Detalhes do Filme"
            description="Veja mais informações sobre o filme"
          />
          <img
            src={`${BACKDROP_BASE}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/60 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {movie.poster_path && (
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="w-64 rounded-2xl shadow-2xl shrink-0 self-start"
            />
          )}

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-zinc-400 text-sm">
              {year && <span>{year}</span>}
              {duration && <span>{duration}</span>}
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold-300 fill-gold-300" />
                  <span className="text-gold-300 font-medium">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((g: any) => (
                <span
                  key={g.id}
                  className="px-3 py-1 badge-gold text-xs rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={toggleFavorite}
                disabled={favLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors cursor-pointer ${
                  isFavorite
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-[#18181f] text-zinc-300 border border-[#27272f] hover:border-gold-300/50'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-red-400' : ''}`}
                />
                {isFavorite ? 'Favoritado' : 'Favoritar'}
              </button>

              <AddToList
                tmdbId={movie.id}
                mediaType="movie"
                title={movie.title}
                posterPath={movie.poster_path}
              />

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 btn-gold rounded-xl font-medium transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Trailer
                </a>
              )}
            </div>

            {movie.overview && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-3">
                  Sinopse
                </h2>
                <p className="text-zinc-300 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            )}

            <div className="mb-8">
              <ReviewForm tmdbId={movie.id} mediaType="movie" />
            </div>

            {movie.credits?.cast?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Elenco
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movie.credits.cast.slice(0, 12).map((actor: any) => (
                    <div key={actor.id} className="text-center">
                      {actor.profile_path ? (
                        <img
                          src={`${IMG_BASE}${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full aspect-square object-cover rounded-xl mb-2"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-[#18181f] rounded-xl mb-2 flex items-center justify-center text-zinc-600 text-xs">
                          Sem foto
                        </div>
                      )}
                      <p className="text-white text-xs font-medium truncate">
                        {actor.name}
                      </p>
                      <p className="text-zinc-500 text-xs truncate">
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
