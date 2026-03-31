export interface Favorite {
  id: string;
  tmdbId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
  createdAt: string;
}

export interface List {
  id: string;
  name: string;
  description: string | null;
  coverUrl: string | null;
  createdAt: string;
  _count?: { items: number };
  items?: ListItem[];
}

export interface ListItem {
  id: string;
  tmdbId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
  addedAt: string;
}

export interface Review {
  id: string;
  tmdbId: number;
  mediaType: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}
