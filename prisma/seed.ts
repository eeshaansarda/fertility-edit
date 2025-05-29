//import { PrismaClient } from '../lib/generated/prisma';
import { productsData } from './productData';
import prisma from '../lib/prisma';

// const prisma = new PrismaClient();

export async function main() {
  await prisma.product.deleteMany();
  console.log('🌱 Starting to seed database...');
  
  for (const productData of productsData) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log('🌱 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
