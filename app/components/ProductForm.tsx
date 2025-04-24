"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/generated/prisma";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { productSchema } from "@/app/productSchema";

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  isEditing?: boolean;
  productId?: string;
}

export default function ProductForm({ 
  defaultValues, 
  isEditing = false, 
  productId 
}: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: undefined,
      price: 0,
      imageUrl: "",
      expertSummary: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);

    try {
      const productData = {
        ...data,
      };

      const url = isEditing 
        ? `/api/products/${productId}` 
        : "/api/products";
      
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save product");
      }

      const savedProduct = await response.json();

      toast.message(isEditing ? "Product Updated" : "Product Created", {
        description: `Successfully ${isEditing ? "updated" : "added"} ${savedProduct.name}`,
      });

      router.push(`/products/${savedProduct.slug}`);
      router.refresh();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detailed product description" 
                  className="min-h-32" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Category.OVULATION_TESTS}>
                      Ovulation & Fertility Tests
                    </SelectItem>
                    <SelectItem value={Category.SUPPLEMENTS}>
                      Supplements
                    </SelectItem>
                    <SelectItem value={Category.FERTILITY_FRIENDLY}>
                      Fertility-Friendly Products
                    </SelectItem>
                    <SelectItem value={Category.PREGNANCY_TESTS}>
                      Pregnancy Tests
                    </SelectItem>
                    <SelectItem value={Category.APPS_TRACKERS}>
                      Apps & Trackers
                    </SelectItem>
                    <SelectItem value={Category.OTHER}>
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <FormField
          control={form.control}
          name="expertSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expert Summary (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Expert insights about this product" 
                  className="min-h-24" 
                  {...field} 
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Professional analysis or expert opinions on this product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}