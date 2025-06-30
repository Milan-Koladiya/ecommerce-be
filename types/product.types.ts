import type { ICategory } from "./category.types";
import type { ISubcategory } from "./subcategory.types";

export interface IProduct{
    id?: string;
    name: string;
    description: string;
    price: number;
    category_id?: string; 
    image_url?: string;                  
    subcategory_id?: string; 
    category?:ICategory
    subcategory?: ISubcategory;
}