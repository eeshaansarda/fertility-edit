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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Product } from "@/lib/generated/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const origin = process.env.BASE_URL ?? "http://localhost:3000";
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
  const origin = process.env.BASE_URL ?? "http://localhost:3000";
  const response = await fetch(`${origin}/api/products/${slug}`);
  const product: Product = await response.json();

  if (!product.id) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(product.category);

  return (
    <div className="container mx-auto p-4 md:p-10 max-w-6xl">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`}>
              {categoryLabel}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" aria-current="page" className="truncate max-w-[150px] inline-block">
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow">
          <Image
            src={product.imageUrl || ""}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <Badge variant="outline" className="text-sm">
              {categoryLabel}
            </Badge>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
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
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>

            <p className="text-2xl font-semibold mt-4">${product.price}</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-1">About This Product</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div>
            <Button className="w-full mb-2">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Amazon
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              *Purchase links may include affiliate codes
            </p>
          </div>
        </div>
      </div>

      {product.expertSummary && (
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Expert Insight</CardTitle>
            <CardDescription>
              Our fertility experts have analyzed this product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {product.expertSummary}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
