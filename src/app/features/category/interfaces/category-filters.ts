import { BreadCrumb } from "./bread-crumb";
import { Category } from "./category";

export interface CategoryFilters {
    breadcrumb:BreadCrumb[],
    category_tree:Category,
    active_category:Category
}
