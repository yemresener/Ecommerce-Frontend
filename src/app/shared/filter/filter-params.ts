export interface FilterParams {
  slug?: string;
  rating?: number | null;
  sort_by?: string | null;
  order?: 'asc' | 'desc' | null;
  page?:number;
  q?:string;
  min_price?:number;
  max_price?:number;
}