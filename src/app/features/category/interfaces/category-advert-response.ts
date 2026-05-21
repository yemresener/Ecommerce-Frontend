import { ApiResponse } from "./api-response";
import { CategoryFilters } from "./category-filters";

export interface CategoryAdvertResponse<T> extends ApiResponse<T> {
    filters: CategoryFilters;
}