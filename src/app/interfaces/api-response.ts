import { PaginationMeta } from "./pagination-meta";
export interface ApiResponse<T> {
    data: T;
    meta:PaginationMeta;
    message?: string;
}