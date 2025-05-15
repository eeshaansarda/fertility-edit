"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/lib/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/generated/prisma";
import FilterPanel from "../components/FilterPanel";
import { FilterState } from "@/types";

// Separate component that uses useSearchParams
function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({});
  
  // Effect 1: Initialize state from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const urlSearchTerm = params.get("search") || "";
    
    setLocalSearchTerm(urlSearchTerm);
    setFilters({
      category: params.get("category") as Category | undefined,
      minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      minRating: params.get("minRating") ? Number(params.get("minRating")) : undefined,
      sort: params.get("sort") || undefined,
    });
  }, [searchParams]);
  
  // Effect 2: Fetch products based on current URL parameters
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?${searchParams.toString()}`);
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
  }, [searchParams]);
  
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateUrl();
    }
  };
  
  const updateUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update search parameter
    if (localSearchTerm) {
      params.set("search", localSearchTerm);
    } else {
      params.delete("search");
    }
    
    // Update filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    
    const newUrl = `/products?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };
  
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Debounce URL updates for filter changes
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Update filter parameters
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });
      
      // Preserve search term
      if (localSearchTerm) {
        params.set("search", localSearchTerm);
      } else {
        params.delete("search");
      }
      
      const newUrl = `/products?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };
  
  const resetFilters = () => {
    setFilters({});
    setLocalSearchTerm("");
    router.push("/products", { scroll: false });
    setShowFilters(false);
  };
  
  // Count active filters
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  
  return (
    <div className="container py-4 sm:py-8 px-4 sm:px-6 mx-auto">
      <div className="flex flex-col items-center justify-center pb-4">
        {/* Search bar - stacked on mobile, horizontal on larger screens */}
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowFilters(!showFilters)}
              className="relative hover:cursor-pointer"
              aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <Button 
              onClick={updateUrl}
              size="sm"
              className="hover:cursor-pointer flex-1 sm:flex-initial"
            >
              Search
            </Button>
          </div>
        </div>
        
        {/* Toggleable Filter Panel */}
        {showFilters && (
          <div className="w-full max-w-3xl mx-auto mt-4 border rounded-lg p-3 sm:p-4">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
            />
          </div>
        )}
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">
            {products.length} Products Found
          </h2>
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-xs sm:text-sm self-start sm:self-auto"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 w-full gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-lg p-3 sm:p-4">
                <Skeleton className="h-8 sm:h-10 w-full mb-3 sm:mb-4" />
                <Skeleton className="h-3 w-3/4 mb-2" />
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-1 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12">
            <p className="mb-4 text-base sm:text-lg text-muted-foreground text-center px-4">
              No products found. Try adjusting your search or filters.
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 w-full gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function ProductsLoading() {
  return (
    <div className="container py-4 sm:py-8 px-4 sm:px-6 mx-auto">
      <div className="flex flex-col items-center justify-center pb-4">
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-16 sm:w-20 flex-1 sm:flex-initial" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-4">
          <Skeleton className="h-7 sm:h-8 w-32 sm:w-48" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 w-full gap-3 md:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-lg p-3 sm:p-4">
              <Skeleton className="h-8 sm:h-10 w-full mb-3 sm:mb-4" />
              <Skeleton className="h-3 w-3/4 mb-2" />
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-1 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense
const ProductsPage = () => {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
};

export default ProductsPage;