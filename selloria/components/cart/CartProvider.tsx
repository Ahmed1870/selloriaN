'use client'
// components/cart/CartProvider.tsx
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Cart, Product } from '@/types'
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart } from '@/lib/cart'

interface CartContextType {
  cart: Cart
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateItem: (productId: string, quantity: number) => void
  clearItems: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, count: 0 })

  useEffect(() => {
    setCart(getCart())
  }, [])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setCart(addToCart(product, quantity))
  }, [])

  const removeItem = useCallback((productId: string) => {
    setCart(removeFromCart(productId))
  }, [])

  const updateItem = useCallback((productId: string, quantity: number) => {
    setCart(updateQuantity(productId, quantity))
  }, [])

  const clearItems = useCallback(() => {
    clearCart()
    setCart({ items: [], total: 0, count: 0 })
  }, [])

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem, clearItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
