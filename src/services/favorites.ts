import { api } from '../lib/api';
import { Favorite } from '../types/models';

export async function addFavorite(data: {
  tmdbId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
}) {
  const { data: favorite } = await api.post<Favorite>('/favorites', data);
  return favorite;
}

export async function removeFavorite(tmdbId: number, mediaType: string) {
  await api.delete(`/favorites/${tmdbId}/${mediaType}`);
}

export async function checkFavorite(tmdbId: number, mediaType: string) {
  const { data } = await api.get<{ isFavorite: boolean }>(
    `/favorites/check/${tmdbId}/${mediaType}`,
  );
  return data.isFavorite;
}

export async function listFavorites(type?: string) {
  const params = type ? { type } : {};
  const { data } = await api.get<Favorite[]>('/favorites', { params });
  return data;
}
