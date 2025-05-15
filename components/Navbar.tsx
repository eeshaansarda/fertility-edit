"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LayoutGrid,
  TestTube,
  Pill,
  Heart,
  Baby,
  Smartphone,
  Package,
  Menu,
  BookText,
  ShoppingBasket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/generated/prisma";

const categories = [
  {
    id: "all",
    name: "Browse All",
    icon: LayoutGrid,
  },
  {
    id: Category.OVULATION_TESTS,
    name: "Ovulation & Fertility Tests",
    icon: TestTube,
  },
  {
    id: Category.SUPPLEMENTS,
    name: "Supplements",
    icon: Pill,
  },
  {
    id: Category.FERTILITY_FRIENDLY,
    name: "Fertility Friendly Products",
    icon: Heart,
  },
  {
    id: Category.PREGNANCY_TESTS,
    name: "Pregnancy Tests",
    icon: Baby,
  },
  {
    id: Category.APPS_TRACKERS,
    name: "Apps & Trackers",
    icon: Smartphone,
  },
  {
    id: Category.OTHER,
    name: "Other",
    icon: Package,
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-wider">
            The Fertility Edit
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center gap-2">
                    <ShoppingBasket className="h-4 w-4" />
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 grid gap-2 grid-cols-1 min-w-[300px]">
                    {categories.map(({ id, name, icon: Icon }) => (
                      <Link
                        key={id}
                        href={`/products?category=${id === "all" ? "" : id}`}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                      >
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{name}</span>
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/guides"
                    className="flex items-center gap-2 px-4 py-2 hover:text-primary text-sm font-medium"
                  >
                    <BookText className="h-4 w-4" />
                    Guides
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full h-full top-0 right-0 rounded-none">
                <SheetHeader className="text-left px-4 pt-4">
                  <SheetTitle className="text-xl font-bold">The Fertility Edit</SheetTitle>
                </SheetHeader>
                <div className="px-4 py-2 space-y-1">
                  {/* Products Accordion */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="products">
                      <AccordionTrigger className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm font-medium">
                        <div className="flex items-center gap-2">
                        <ShoppingBasket className="w-4 h-4 text-muted-foreground" />
                        Products
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-4 space-y-1">
                        {categories.map(({ id, name, icon: Icon }) => (
                          <Link
                            key={id}
                            href={`/products?category=${id === "all" ? "" : id}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm"
                          >
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            {name}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Guides Link styled like accordion trigger */}
                  <Link
                    href="/guides"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm font-medium"
                  >
                    <BookText className="w-4 h-4" />
                    Guides
                    <span></span>
                  </Link>
                </div>
              </SheetContent>

            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
