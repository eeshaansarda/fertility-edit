import { Category } from "@/lib/generated/prisma";
import { z } from "zod";

// Schema for creating a product
export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    //features: z.array(z.string()).min(1, "At least one feature is required"),
    category: z.nativeEnum(Category, { required_error: "Category is required" }),
    price: z.number().positive("Price must be positive"),
    imageUrl: z.string().url("Valid image URL is required"),
    expertSummary: z.string().optional().nullable(),
});
