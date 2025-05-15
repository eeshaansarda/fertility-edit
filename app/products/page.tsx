"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/lib/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/generated/prisma";
import FilterPanel from "../components/FilterPanel";
import { FilterState } from "@/types";

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState<FilterState>({});

  // Initialize filters from URL whenever the query string changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      category: params.get("category") as Category | undefined,
      minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      minRating: params.get("minRating") ? Number(params.get("minRating")) : undefined,
      sort: params.get("sort") || undefined,
    });
    setSearchTerm(params.get("search") || "");
  }, [searchParams]);

  // Fetch products from API when filters or search term changes
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.category) queryParams.set("category", filters.category);
      if (filters.minPrice) queryParams.set("minPrice", filters.minPrice.toString());
      if (filters.maxPrice) queryParams.set("maxPrice", filters.maxPrice.toString());
      if (filters.minRating) queryParams.set("minRating", filters.minRating.toString());
      if (filters.sort) queryParams.set("sort", filters.sort);
      if (searchTerm) queryParams.set("search", searchTerm);

      try {
        const response = await fetch(`/api/products?${queryParams.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters, searchTerm]);

  // Push filters to URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.minRating) params.set("minRating", filters.minRating.toString());
    if (filters.sort) params.set("sort", filters.sort);
    if (searchTerm) params.set("search", searchTerm);

    const newUrl = `/products?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [filters, searchTerm, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center justify-center pb-8">
        <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {products.length} Products Found
            </h2>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 w-full max-w-7xl gap-3 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <Skeleton className="h-10 w-full mb-4" />
                  <Skeleton className="h-3 w-3/4 mb-2" />
                  <Skeleton className="h-2 w-full mb-2" />
                  <Skeleton className="h-1 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-lg text-muted-foreground">
                No products found.
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 w-full max-w-7xl gap-3 md:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
