import { api } from '../lib/api';
import { List } from '../types/models';

export async function createList(data: { name: string; description?: string }) {
  const { data: list } = await api.post<List>('/lists', data);
  return list;
}

export async function getMyLists() {
  const { data } = await api.get<List[]>('/lists');
  return data;
}

export async function getListById(id: string) {
  const { data } = await api.get<List>(`/lists/${id}`);
  return data;
}

export async function updateList(
  id: string,
  data: { name?: string; description?: string },
) {
  const { data: list } = await api.patch<List>(`/lists/${id}`, data);
  return list;
}

export async function deleteList(id: string) {
  await api.delete(`/lists/${id}`);
}

export async function addItemToList(
  listId: string,
  data: {
    tmdbId: number;
    mediaType: string;
    title: string;
    posterPath: string | null;
  },
) {
  const { data: item } = await api.post(`/lists/${listId}/items`, data);
  return item;
}

export async function removeItemFromList(listId: string, itemId: string) {
  await api.delete(`/lists/${listId}/items/${itemId}`);
}
