import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/generated/prisma";

export const dynamic = 'force-dynamic'

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const origin = process.env.BASE_URL ?? 'http://localhost:3000';
  const response = await fetch(`${origin}/api/products/${slug}`);
  const product: Product = await response.json();
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | The Fertility Edit`,
    description: product.description,
  };
}

// Helper function to get category display name
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    OVULATION_TESTS: "Ovulation Tests",
    SUPPLEMENTS: "Supplements",
    FERTILITY_FRIENDLY: "Fertility-Friendly",
    PREGNANCY_TESTS: "Pregnancy Tests",
    APPS_TRACKERS: "Apps & Trackers",
    OTHER: "Other",
  };
  
  return labels[category] || category;
}


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const origin = process.env.BASE_URL ?? 'http://localhost:3000';
  const response = await fetch(`${origin}/api/products/${slug}`);
  const product: Product = await response.json();

  if (!product.id) {
    notFound();
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl || ""}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
            <h1 className="text-3xl font-bold mt-2 mb-1">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>
            <p className="text-lg font-medium mb-2">
              ${product.price}
            </p>
          </div>
          
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">About This Product</h2>
        <div className="prose max-w-none">
          <p>{product.description}</p>
        </div>
      </div>
          <div className="pt-2">
            <Button className="w-full mb-2">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Amazon
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              *Purchase links may include affiliate codes
            </p>
          </div>

        {product.expertSummary && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Expert Insight</CardTitle>
              <CardDescription>
                Our fertility experts have analyzed this product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.expertSummary}</p>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
      
    </div>
  );
}