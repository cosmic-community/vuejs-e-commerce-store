// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    name?: string
    description?: string
    price?: number
    images?: Array<{
      url: string
      imgix_url: string
    }>
    in_stock?: boolean
    collections?: Collection[] | string[]
    sku?: string
  }
}

// Collection interface
export interface Collection extends CosmicObject {
  type: 'collections'
  metadata: {
    name?: string
    description?: string
    image?: {
      url: string
      imgix_url: string
    }
    featured?: boolean
  }
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    customer_name?: string
    rating?: {
      key: string
      value: string
    }
    title?: string
    comment?: string
    product?: Product
    verified_purchase?: boolean
  }
}

// Type literals for rating values
export type RatingValue = '1' | '2' | '3' | '4' | '5'

// API response interface
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products'
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections'
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews'
}