import { api } from '../lib/api';
import { Review } from '../types/models';

export async function createReview(data: {
  tmdbId: number;
  mediaType: string;
  rating: number;
  comment?: string;
}) {
  const { data: review } = await api.post<Review>('/reviews', data);
  return review;
}

export async function listMyReviews(type?: string) {
  const params = type ? { type } : {};
  const { data } = await api.get<Review[]>('/reviews', { params });
  return data;
}

export async function getReview(tmdbId: number, mediaType: string) {
  const { data } = await api.get<Review>(`/reviews/${tmdbId}/${mediaType}`);
  return data;
}

export async function updateReview(
  tmdbId: number,
  mediaType: string,
  data: { rating?: number; comment?: string },
) {
  const { data: review } = await api.patch<Review>(
    `/reviews/${tmdbId}/${mediaType}`,
    data,
  );
  return review;
}

export async function deleteReview(tmdbId: number, mediaType: string) {
  await api.delete(`/reviews/${tmdbId}/${mediaType}`);
}
