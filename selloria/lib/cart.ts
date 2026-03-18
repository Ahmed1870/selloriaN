// lib/cart.ts
import type { Cart, CartItem, Product } from '@/types'

const CART_KEY = 'selloria_cart'

export function getCart(): Cart {
  if (typeof window === 'undefined') return { items: [], total: 0, count: 0 }
  try {
    const raw = localStorage.getItem(CART_KEY)
    const items: CartItem[] = raw ? JSON.parse(raw) : []
    return buildCart(items)
  } catch {
    return { items: [], total: 0, count: 0 }
  }
}

export function addToCart(product: Product, quantity = 1): Cart {
  const cart = getCart()
  const existingIndex = cart.items.findIndex(i => i.product.id === product.id)

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += quantity
  } else {
    cart.items.push({ product, quantity })
  }

  saveCart(cart.items)
  return buildCart(cart.items)
}

export function removeFromCart(productId: string): Cart {
  const cart = getCart()
  const items = cart.items.filter(i => i.product.id !== productId)
  saveCart(items)
  return buildCart(items)
}

export function updateQuantity(productId: string, quantity: number): Cart {
  const cart = getCart()
  if (quantity <= 0) return removeFromCart(productId)

  const items = cart.items.map(item =>
    item.product.id === productId ? { ...item, quantity } : item
  )
  saveCart(items)
  return buildCart(items)
}

export function clearCart(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_KEY)
  }
}

function saveCart(items: CartItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }
}

function buildCart(items: CartItem[]): Cart {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  return { items, total, count }
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ar-EG')} جنيه`
}

export const STATUS_LABELS: Record<string, string> = {
  pending: 'في الانتظار',
  payment_uploaded: 'تم رفع الدفع',
  payment_verified: 'تم التحقق من الدفع',
  processing: 'قيد التجهيز',
  shipped: 'تم الشحن',
  delivered: 'تم التسليم',
  cancelled: 'ملغي',
}

export const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  payment_uploaded: 'bg-blue-100 text-blue-800',
  payment_verified: 'bg-indigo-100 text-indigo-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-cyan-100 text-cyan-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}
