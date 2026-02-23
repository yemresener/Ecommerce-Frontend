export interface FilterParams {
  slug?: string;
  rating?: number | null;
  sort_by?: string | null;
  order?: 'asc' | 'desc' | null;
  page?:number;
  min_price?:number | null;
  max_price?:number | null;
}