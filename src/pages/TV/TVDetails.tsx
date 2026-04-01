import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTVDetails } from '../../services/tmdb';
import {
  addFavorite,
  removeFavorite,
  checkFavorite,
} from '../../services/favorites';
import { AddToList } from '../../components/ui/AddToList';
import { ReviewForm } from '../../components/ui/ReviewForm';
import { Heart, Star, Play, ArrowLeft } from 'lucide-react';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

export function TVDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const tvId = Number(id);

    Promise.all([getTVDetails(tvId), checkFavorite(tvId, 'tv')])
      .then(([details, favStatus]) => {
        setShow(details);
        setIsFavorite(favStatus);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  async function toggleFavorite() {
    if (!show) return;
    setFavLoading(true);

    try {
      if (isFavorite) {
        await removeFavorite(show.id, 'tv');
        setIsFavorite(false);
      } else {
        await addFavorite({
          tmdbId: show.id,
          mediaType: 'tv',
          title: show.name,
          posterPath: show.poster_path,
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
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Carregando...
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Série não encontrada
      </div>
    );
  }

  const trailer = show.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube',
  );

  const year = show.first_air_date
    ? new Date(show.first_air_date).getFullYear()
    : '';

  return (
    <div className="min-h-screen bg-slate-950">
      {show.backdrop_path && (
        <div className="relative h-100 w-full">
          <img
            src={`${BACKDROP_BASE}${show.backdrop_path}`}
            alt={show.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {show.poster_path && (
            <img
              src={`${IMG_BASE}${show.poster_path}`}
              alt={show.name}
              className="w-64 rounded-2xl shadow-2xl shrink-0 self-start"
            />
          )}

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {show.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-slate-400 text-sm">
              {year && <span>{year}</span>}
              {show.number_of_seasons && (
                <span>
                  {show.number_of_seasons} temporada
                  {show.number_of_seasons > 1 ? 's' : ''}
                </span>
              )}
              {show.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-yellow-500 font-medium">
                    {show.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {show.genres?.map((g: any) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs rounded-full"
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
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-purple-500/50'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-red-400' : ''}`}
                />
                {isFavorite ? 'Favoritado' : 'Favoritar'}
              </button>

              <AddToList
                tmdbId={show.id}
                mediaType="tv"
                title={show.name}
                posterPath={show.poster_path}
              />

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Trailer
                </a>
              )}
            </div>

            {show.overview && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-3">
                  Sinopse
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {show.overview}
                </p>
              </div>
            )}

            <div className="mb-8">
              <ReviewForm tmdbId={show.id} mediaType="tv" />
            </div>

            {show.credits?.cast?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Elenco
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {show.credits.cast.slice(0, 12).map((actor: any) => (
                    <div key={actor.id} className="text-center">
                      {actor.profile_path ? (
                        <img
                          src={`${IMG_BASE}${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full aspect-square object-cover rounded-xl mb-2"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-slate-800 rounded-xl mb-2 flex items-center justify-center text-slate-600 text-xs">
                          Sem foto
                        </div>
                      )}
                      <p className="text-white text-xs font-medium truncate">
                        {actor.name}
                      </p>
                      <p className="text-slate-500 text-xs truncate">
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
    </div>
  );
}
