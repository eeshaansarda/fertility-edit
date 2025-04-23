import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoIosArrowRoundDown } from "react-icons/io";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-white to-[#F9EBE0]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
          The Fertility Edit
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Cut through the noise. Real reviews and expert insight on fertility products; all in one place.
        </p>
        <Link 
          href="/categories"
          className="inline-flex items-center justify-center rounded-2xl bg-[#e7ded1] px-6 py-3 text-lg font-medium text-[#7c7570] hover:bg-[#e7ded1c4] transition-colors"
        >
          Explore Products
        </Link>
      </div>
      
      <div className="mt-16 text-3xl animate-bounce">
        <Link href="/categories">
          <IoIosArrowRoundDown />
        </Link>
      </div>
    </section>
  );
}