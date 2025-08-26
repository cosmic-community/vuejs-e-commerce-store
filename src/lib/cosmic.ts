import { createBucketClient } from '@cosmicjs/sdk'
import type { Product, Collection, Review, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: import.meta.env.VITE_COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.VITE_COSMIC_READ_KEY,
  writeKey: import.meta.env.VITE_COSMIC_WRITE_KEY,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

// Get products by collection
export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  try {
    const allProducts = await getProducts()
    
    return allProducts.filter(product => {
      const collections = product.metadata?.collections
      if (!collections) return false
      
      return collections.some((collection: any) => 
        typeof collection === 'object' ? collection.slug === collectionSlug : false
      )
    })
  } catch (error) {
    console.error('Error fetching products by collection:', error)
    throw new Error('Failed to fetch products by collection')
  }
}

// Get single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}

// Get all collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Collection[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching collections:', error)
    throw new Error('Failed to fetch collections')
  }
}

// Get single collection by slug
export async function getCollection(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as Collection
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching collection:', error)
    throw new Error('Failed to fetch collection')
  }
}

// Get all reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching reviews:', error)
    throw new Error('Failed to fetch reviews')
  }
}

// Get reviews for a specific product
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const allReviews = await getReviews()
    
    return allReviews.filter(review => 
      review.metadata?.product?.id === productId
    )
  } catch (error) {
    console.error('Error fetching product reviews:', error)
    throw new Error('Failed to fetch product reviews')
  }
}