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
    {/*
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="text-lg font-bold">
            The Fertility Edit
          </Link>
          <nav className="hidden gap-6 md:flex">
            <a 
            href="/products"
            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Products
            </a>
            <a
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Guides
            </a>
          </nav>
        </div>
      </div>
    </header>
  */}
    </nav>
  )
};

export default Navbar;