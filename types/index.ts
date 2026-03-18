// types/index.ts

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  address: string | null
  city: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_price: number | null
  stock_quantity: number
  category_id: string | null
  category?: Category
  images: string[]
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export type OrderStatus =
  | 'pending'
  | 'payment_uploaded'
  | 'payment_verified'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface ShippingAddress {
  full_name: string
  phone: string
  address: string
  city: string
  notes?: string
}

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  total_amount: number
  shipping_address: ShippingAddress
  vodafone_wallet_number: string | null
  payment_screenshot_url: string | null
  payment_verified_at: string | null
  payment_verified_by: string | null
  notes: string | null
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
  profiles?: Profile
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_image: string | null
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  product?: Product
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  count: number
}
