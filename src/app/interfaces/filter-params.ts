export interface FilterParams {
  slug?: string;
  rating?: number | null;
  sort_by?: string | null;
  order?: 'asc' | 'desc' | null;
  page?:number
}