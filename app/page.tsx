import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: "The Fertility Edit | Curated Fertility Products",
  description: "Cut through the noise. Real reviews and expert insight on fertility products; all in one place.",
};

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
          The Fertility Edit
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Cut through the noise. Real reviews and expert insight on fertility products; all in one place.
        </p>
        <Button asChild>
          <Link href="/products" >
            Explore Products
          </Link>
        </Button>
      </div>
    </section>
  );
}