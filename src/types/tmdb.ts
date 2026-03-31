export interface TMDBResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: 'movie' | 'tv';
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export interface TMDBSearchResponse {
  results: TMDBResult[];
  page: number;
  total_pages: number;
  total_results: number;
}
