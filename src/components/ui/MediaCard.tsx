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
      <div className="relative overflow-hidden rounded-xl bg-[#0f0f14] border border-[#27272f] hover:border-gold-300/50 transition-all duration-300">
        {item.poster_path ? (
          <img
            src={`${IMG_BASE}${item.poster_path}`}
            alt={title}
            className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-[#18181f] flex items-center justify-center text-zinc-500 text-sm">
            Sem imagem
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <h3 className="text-white font-semibold text-sm truncate">{title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-zinc-400 text-xs">{year}</span>
            {item.vote_average > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-gold-300 fill-gold-300" />
                <span className="text-gold-300 text-xs font-medium">
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 badge-gold text-xs rounded-full">
            {item.media_type === 'movie' ? 'Filme' : 'Série'}
          </span>
        </div>
      </div>
    </Link>
  );
}
