-- CreateEnum
CREATE TYPE "Category" AS ENUM ('OVULATION_TESTS', 'SUPPLEMENTS', 'FERTILITY_FRIENDLY', 'PREGNANCY_TESTS', 'APPS_TRACKERS', 'OTHER');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "numReviews" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expertSummary" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
