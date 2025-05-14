import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/app/productSchema";
import { z } from "zod";
import { Category } from "@/lib/generated/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

    // Parse filter parameters
  const category = searchParams.get("category") as Category | undefined;
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const minRating = searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined;
  const sort = searchParams.get("sort");
  
  // Build query filters
  const filters: any = {};
  
  if (category) {
    filters.category = category;
  }
  
  if (search) {
    filters.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  if (minPrice !== undefined) {
    filters.price = { gte: minPrice };
  }
  
  if (maxPrice !== undefined) {
    filters.price = { ...filters.price, lte: maxPrice };
  }
  
  if (minRating !== undefined) {
    filters.rating = { gte: minRating };
  }
  
  // Build sort options
  let orderBy: any = { createdAt: 'desc' };
  
  if (sort === 'price_asc') {
    orderBy = { price: 'asc' };
  } else if (sort === 'price_desc') {
    orderBy = { price: 'desc' };
  } else if (sort === 'rating_desc') {
    orderBy = { rating: 'desc' };
  } else if (sort === 'name_asc') {
    orderBy = { name: 'asc' };
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = productSchema.parse(body);
    
    // Create slug from product name
    const slug = slugify(validatedData.name);
    
    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });
    
    if (existingProduct) {
      return NextResponse.json(
        { error: "A product with this name already exists" },
        { status: 400 }
      );
    }
    
    // Create the product
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug,
        rating: 0, // Default values
        numReviews: 0,
      },
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}