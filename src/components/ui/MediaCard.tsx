import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { TMDBResult } from '../../types/tmdb';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface MediaCardProps {
  item: TMDBResult;
}

export function MediaCard({ item }: MediaCardProps) {
  const title = item.title || item.name || 'Sem título';
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : '';
  const type = item.media_type === 'movie' ? 'movie' : 'tv';
  const link = `/${type}/${item.id}`;

  return (
    <Link to={link} className="group">
      <div className="relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
        {item.poster_path ? (
          <img
            src={`${IMG_BASE}${item.poster_path}`}
            alt={title}
            className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-slate-700 flex items-center justify-center text-slate-500 text-sm">
            Sem imagem
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <h3 className="text-white font-semibold text-sm truncate">{title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-slate-400 text-xs">{year}</span>
            {item.vote_average > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-yellow-500 text-xs font-medium">
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
            {item.media_type === 'movie' ? 'Filme' : 'Série'}
          </span>
        </div>
      </div>
    </Link>
  );
}
