import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookText, ShoppingBasket } from 'lucide-react';

const Navbar = () => {
  return (

    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/*Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider"
            >
              The Fertility Edit
            </Link>
          </div>

          {/*Navbar components*/}

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/products">
                <ShoppingBasket />
                <span className="lg:inline">Products</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/guides">
                <BookText />
                <span className="lg:inline">Guides</span>
              </Link>
            </Button>
            </div>
          </div>
        </div>
    </nav>
  )
};

export default Navbar;