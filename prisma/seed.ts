import { PrismaClient, Prisma } from '../lib/generated/prisma';

const prisma = new PrismaClient();

const productsData: Prisma.ProductCreateInput[] = [
    {
    slug: 'ovulation-strip-kit',
    name: 'Ovulation Test Strips Kit',
    description: 'Accurate and easy-to-use ovulation test strips for daily tracking.',
    category: 'OVULATION_TESTS',
    price: 19.99,
    rating: 4.5,
    numReviews: 120,
    imageUrl: 'https://example.com/images/ovulation-kit.jpg',
    expertSummary: 'Highly recommended for tracking LH surge with precision.'
    },
    {
    slug: 'prenatal-supplements',
    name: 'Prenatal Supplements',
    description: 'Essential vitamins and minerals for pre-conception and pregnancy.',
    category: 'SUPPLEMENTS',
    price: 24.99,
    rating: 4.8,
    numReviews: 85,
    imageUrl: 'https://example.com/images/prenatal.jpg',
    expertSummary: 'Includes folic acid, iron, and DHA. A must-have for TTC women.'
    },
    {
    slug: 'fertility-friendly-lube',
    name: 'Fertility Friendly Lubricant',
    description: 'Designed to support sperm motility and conception.',
    category: 'FERTILITY_FRIENDLY',
    price: 14.99,
    rating: 4.2,
    numReviews: 60,
    imageUrl: 'https://example.com/images/lubricant.jpg',
    expertSummary: 'OB-GYN approved and pH balanced for optimal fertility support.'
    },
    {
    slug: 'early-pregnancy-test',
    name: 'Early Detection Pregnancy Test',
    description: 'Sensitive enough to detect pregnancy up to 6 days before missed period.',
    category: 'PREGNANCY_TESTS',
    price: 11.99,
    rating: 4.6,
    numReviews: 145,
    imageUrl: 'https://example.com/images/pregnancy-test.jpg',
    expertSummary: 'Fast results and over 99% accurate in clinical testing.'
    },
    {
    slug: 'fertility-tracker-app',
    name: 'Fertility Tracker App Premium',
    description: 'Digital cycle tracker with ovulation prediction and insights.',
    category: 'APPS_TRACKERS',
    price: 4.99,
    rating: 4.9,
    numReviews: 300,
    imageUrl: 'https://example.com/images/tracker-app.jpg',
    expertSummary: 'Best-in-class AI-powered cycle predictions for TTC couples.'
    },
];

export async function main() {
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
