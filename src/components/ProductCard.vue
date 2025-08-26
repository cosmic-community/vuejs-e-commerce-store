<template>
  <div class="card group cursor-pointer transform transition-transform hover:scale-105">
    <RouterLink :to="`/products/${product.slug}`" class="block">
      <!-- Product Image -->
      <div class="aspect-square bg-gray-200 overflow-hidden">
        <img 
          v-if="featuredImage"
          :src="`${featuredImage.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`"
          :alt="product.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
          <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Product Info -->
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ product.metadata?.name || product.title }}
        </h3>
        
        <!-- Price -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-2xl font-bold text-primary-600">
            ${{ formatPrice(product.metadata?.price || 0) }}
          </span>
          
          <!-- Stock Status -->
          <span 
            v-if="product.metadata?.in_stock"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            In Stock
          </span>
          <span 
            v-else
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
          >
            Out of Stock
          </span>
        </div>

        <!-- Rating -->
        <div class="flex items-center">
          <StarRating :rating="averageRating" />
          <span class="ml-2 text-sm text-gray-600">
            ({{ reviewCount }})
          </span>
        </div>

        <!-- Collections -->
        <div v-if="collections.length > 0" class="mt-2">
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="collection in collections"
              :key="collection.id"
              class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
            >
              {{ collection.metadata?.name || collection.title }}
            </span>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product, Collection } from '@/types'
import StarRating from './StarRating.vue'

interface Props {
  product: Product
  reviews?: Array<{
    metadata?: {
      rating?: { key: string; value: string }
    }
  }>
}

const props = defineProps<Props>()

const featuredImage = computed(() => {
  const images = props.product.metadata?.images
  return images && images.length > 0 ? images[0] : null
})

const collections = computed(() => {
  const productCollections = props.product.metadata?.collections
  if (!productCollections) return []
  
  return productCollections.filter((collection: any) => 
    typeof collection === 'object' && collection.id
  ) as Collection[]
})

const reviewCount = computed(() => props.reviews?.length || 0)

const averageRating = computed(() => {
  if (!props.reviews || props.reviews.length === 0) return 0
  
  const ratings = props.reviews
    .map(review => parseInt(review.metadata?.rating?.key || '0'))
    .filter(rating => rating > 0)
  
  if (ratings.length === 0) return 0
  
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
})

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}
</script>