import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/lib/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

// Helper function to get category display name
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    OVULATION_TESTS: "Ovulation Tests",
    SUPPLEMENTS: "Supplements",
    FERTILITY_FRIENDLY: "Fertility Friendly",
    PREGNANCY_TESTS: "Pregnancy Tests",
    APPS_TRACKERS: "Apps & Trackers",
    OTHER: "Other",
  };
  
  return labels[category] || category;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="flex flex-row items-start gap-4 p-4 transition-shadow hover:shadow-md bg-background">
        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl border">
          <Image
            src={product.imageUrl || ""}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
            <CardHeader className="flex-1">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription> {product.description} </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
                </div>
            </CardContent>
        </div>

        <CardFooter className="flex flex-col items-center justify-between">
            <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">
                    {product.rating.toFixed(1)} ({product.numReviews})
                </span>
            </div>
            <span className="mt-4 text-lg font-semibold">${product.price}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}