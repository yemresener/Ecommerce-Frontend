export interface SortOption {      
    label: string;
    value: {
      sort_by: string;
      order: 'asc' | 'desc';
    };
}
