import { Category } from "@/lib/generated/prisma";
    
export type FilterState = {
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sort?: string;
};