<template>
  <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
      <div class="h-4 bg-gray-200 rounded mb-8 w-2/3"></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="card">
          <div class="aspect-square bg-gray-200"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="collection" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <RouterLink to="/" class="text-gray-500 hover:text-gray-700">Home</RouterLink>
        </li>
        <li class="flex items-center">
          <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="ml-4 text-gray-700">{{ collection.metadata?.name || collection.title }}</span>
        </li>
      </ol>
    </nav>

    <!-- Collection Header -->
    <div class="mb-12">
      <div v-if="collection.metadata?.image" class="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <img 
          :src="`${collection.metadata.image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`"
          :alt="collection.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div class="text-center text-white">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              {{ collection.metadata?.name || collection.title }}
            </h1>
            <p v-if="collection.metadata?.description" class="text-xl text-gray-200 max-w-2xl">
              {{ collection.metadata.description }}
            </p>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ collection.metadata?.name || collection.title }}
        </h1>
        <p v-if="collection.metadata?.description" class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ collection.metadata.description }}
        </p>
      </div>

      <!-- Product Count -->
      <div class="flex items-center justify-between">
        <p class="text-lg text-gray-600">
          {{ products.length }} {{ products.length === 1 ? 'product' : 'products' }} found
        </p>
        
        <!-- Featured Badge -->
        <span 
          v-if="collection.metadata?.featured"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
        >
          ⭐ Featured Collection
        </span>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in products"
        :key="product.id"
        :product="product"
        :reviews="getProductReviewsList(product.id)"
      />
    </div>

    <div v-else class="text-center py-16">
      <div class="text-gray-400 text-6xl mb-4">📦</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
      <p class="text-gray-600 mb-8">This collection doesn't have any products yet.</p>
      <RouterLink to="/" class="btn-primary">
        Browse All Products
      </RouterLink>
    </div>
  </div>

  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <div class="text-gray-400 text-6xl mb-4">🔍</div>
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
    <p class="text-gray-600 mb-8">The collection you're looking for doesn't exist.</p>
    <RouterLink to="/" class="btn-primary">
      Back to Home
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getCollection, getProductsByCollection, getReviews } from '@/lib/cosmic'
import type { Product, Collection, Review } from '@/types'
import ProductCard from '@/components/ProductCard.vue'

interface Props {
  slug: string
}

const props = defineProps<Props>()

const collection = ref<Collection | null>(null)
const products = ref<Product[]>([])
const reviews = ref<Review[]>([])
const loading = ref(true)

const getProductReviewsList = (productId: string) => {
  return reviews.value.filter(review => 
    review.metadata?.product?.id === productId
  )
}

onMounted(async () => {
  try {
    const [collectionData, productsData, reviewsData] = await Promise.all([
      getCollection(props.slug),
      getProductsByCollection(props.slug),
      getReviews()
    ])
    
    collection.value = collectionData
    products.value = productsData
    reviews.value = reviewsData
  } catch (error) {
    console.error('Error loading collection:', error)
  } finally {
    loading.value = false
  }
})
</script>