export interface FilterParams {
    slug?: string;
    rating?: number;
    sort_by?: 'rating' | 'created_at';
    order?: 'asc' | 'desc';
  }