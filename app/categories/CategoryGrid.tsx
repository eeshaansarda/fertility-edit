'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
  slug: string;
  iconName?: string | null;
  description?: string | null;
};

export default function CategoryGrid() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories if API fails
        setCategories([
          { id: '1', name: 'Browse All Products',         slug: '',                            iconName: 'grid' },
          { id: '2', name: 'Ovulation & Fertility Tests', slug: 'ovulation-fertility-tests',   iconName: 'test-tube' },
          { id: '3', name: 'Supplements for Men & Women', slug: 'supplements',                 iconName: 'pill' },
          { id: '4', name: 'Fertility-Friendly Products', slug: 'fertility-friendly-products', iconName: 'heart' },
          { id: '5', name: 'Pregnancy Tests',             slug: 'pregnancy-tests',             iconName: 'baby' },
          { id: '6', name: 'Apps & Trackers',             slug: 'apps-trackers',               iconName: 'mobile' },
          { id: '7', name: 'Other',                       slug: 'other',                       iconName: 'plus' },
          
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  function handleCategoryClick(slug: string) {
    if (slug) {
      router.push(`/products?category=${slug}`);
    } else {
      router.push('/products');
    }
  }

  const getCategoryIcon = (iconName?: string | null) => {
    switch (iconName) {
      case 'test-tube':
        return (
          <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'pill':
        return (
          <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'baby':
        return (
          <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        );
      case 'mobile':
        return (
          <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'grid':
        return (
          <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-6 h-40 animate-pulse flex flex-col items-center justify-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center"
          onClick={() => handleCategoryClick(category.slug)}
        >
          {getCategoryIcon(category.iconName)}
          <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
          {category.description && (
            <p className="mt-2 text-sm text-gray-500">{category.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}