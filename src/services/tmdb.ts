import { api } from '../lib/api';
import { TMDBSearchResponse } from '../types/tmdb';

export async function searchMedia(query: string, page = 1) {
  const { data } = await api.get<TMDBSearchResponse>('/tmdb/search', {
    params: { q: query, page },
  });
  return data;
}

export async function getTrending(type = 'all', timeWindow = 'week') {
  const { data } = await api.get<TMDBSearchResponse>('/tmdb/trending', {
    params: { type, time_window: timeWindow },
  });
  return data;
}

export async function getMovieDetails(id: number) {
  const { data } = await api.get(`/tmdb/movie/${id}`);
  return data;
}

export async function getTVDetails(id: number) {
  const { data } = await api.get(`/tmdb/tv/${id}`);
  return data;
}

export async function getGenres(type: string) {
  const { data } = await api.get('/tmdb/genres', { params: { type } });
  return data;
}

export async function discoverMedia(type: string, genre?: number, page = 1) {
  const params: Record<string, string | number> = { type, page };
  if (genre) params.genre = genre;
  const { data } = await api.get('/tmdb/discover', { params });
  return data;
}
