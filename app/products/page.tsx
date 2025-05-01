import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/lib/generated/prisma";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const ProductsPage = async () => {
  const origin = process.env.BASE_URL ?? 'http://localhost:3000';
  const response = await fetch(`${origin}/api/products`);
  const products: Product[] = await response.json();
  
  return (
    <div className="flex flex-col items-center px-4 md:px-8 py-6">
      {/* Filter section with toggle for mobile */}
      <div className="w-full max-w-7xl mb-4 md:mb-6">
        <div className="flex justify-between items-center mb-2 md:mb-4">
          
          {/* Mobile filter button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden flex items-center gap-1"
          >
            <Sliders className="w-4 h-4 mr-1" />
            Filters
          </Button>
          
          {/* Desktop filters */}
          <div className="hidden md:block">
            {/* Filters go here - desktop view */}
            <div className="flex gap-2">
              {/* You can add filter controls here */}
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 w-full max-w-7xl gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
};

export default ProductsPage;