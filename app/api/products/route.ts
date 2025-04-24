import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/app/productSchema";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    
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