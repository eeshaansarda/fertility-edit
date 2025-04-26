import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/lib/generated/prisma";

export const dynamic = 'force-dynamic'

const ProductsPage = async () => {
  const origin = process.env.BASE_URL ?? 'http://localhost:3000';
  const response = await fetch(`${origin}/api/products`);
  const products: Product[] = await response.json();
  return (
    <div className="flex flex-col items-center p-8">
      <div>Filters</div>
      <div className="flex flex-col w-full max-w-7xl gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
};

export default ProductsPage;