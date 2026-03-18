'use client'
// components/product/ProductFilters.tsx
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Category } from '@/types'

interface ProductFiltersProps {
  categories: Category[]
  activeCategory?: string
}

export function ProductFilters({ categories, activeCategory }: ProductFiltersProps) {
  return (
    <div className="card p-4">
      <h3 className="font-bold text-slate-900 mb-4">الفئات</h3>
      <ul className="space-y-1">
        <li>
          <Link
            href="/products"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-blue-50 text-blue-800'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            كل المنتجات
          </Link>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <Link
              href={`/products?category=${cat.slug}`}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-blue-50 text-blue-800'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
