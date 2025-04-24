import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/lib/generated/prisma";

const ProductsPage = async () => {
  const origin = process.env.BASE_URL ?? 'http://localhost:3000'
  const response = await fetch(`${origin}/api/products`)
  const products: Product[] = await response.json();
  console.log(products);
  return (
    <div className="p-8">
      {/*
      <CategoryCards
        selectedCategory={undefined}
        onSelectCategory={() => {}}
      />
*/}

      <div className="flex flex-col gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
};

export default ProductsPage;