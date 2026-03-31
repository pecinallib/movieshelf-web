import { api } from '../lib/api';
import { TMDBSearchResponse } from '../types/tmdb';

export async function searchMedia(query: string, page = 1) {
  const { data } = await api.get<TMDBSearchResponse>('/tmdb/search', {
    params: { q: query, page },
  });
  return data;
}

export async function getTrending() {
  const { data } = await api.get<TMDBSearchResponse>('/tmdb/trending');
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
