import { api } from '../lib/api';

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  _count: {
    favorites: number;
    reviews: number;
    lists: number;
  };
}

export async function getProfile() {
  const { data } = await api.get<ProfileData>('/profile');
  return data;
}
