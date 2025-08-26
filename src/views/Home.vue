<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Vue Store
          </h1>
          <p class="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            Discover amazing products from our curated collections of electronics and home essentials
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Collections -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Collections</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully selected product categories
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="collection in featuredCollections"
            :key="collection.id"
            class="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
          >
            <RouterLink :to="`/collections/${collection.slug}`" class="block">
              <div class="aspect-video bg-gray-200 overflow-hidden">
                <img 
                  v-if="collection.metadata?.image"
                  :src="`${collection.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`"
                  :alt="collection.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div v-else class="w-full h-full bg-primary-100 flex items-center justify-center">
                  <span class="text-primary-600 text-6xl">📦</span>
                </div>
              </div>
              
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div class="text-center text-white">
                  <h3 class="text-2xl font-bold mb-2">
                    {{ collection.metadata?.name || collection.title }}
                  </h3>
                  <p class="text-lg text-gray-200">
                    {{ collection.metadata?.description || 'Discover amazing products' }}
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Latest Products</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out our newest additions and customer favorites
          </p>
        </div>

        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="i in 8" 
            :key="i"
            class="card animate-pulse"
          >
            <div class="aspect-square bg-gray-200"></div>
            <div class="p-4 space-y-3">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              <div class="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>

        <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in products"
            :key="product.id"
            :product="product"
            :reviews="getProductReviewsList(product.id)"
          />
        </div>

        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">🛍️</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
          <p class="text-gray-600">Check back later for new products!</p>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about their purchases
          </p>
        </div>

        <div v-if="reviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReviewCard 
            v-for="review in reviews.slice(0, 6)"
            :key="review.id"
            :review="review"
            :showProduct="true"
          />
        </div>

        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">⭐</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
          <p class="text-gray-600">Be the first to leave a review!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getProducts, getCollections, getReviews } from '@/lib/cosmic'
import type { Product, Collection, Review } from '@/types'
import ProductCard from '@/components/ProductCard.vue'
import ReviewCard from '@/components/ReviewCard.vue'

const products = ref<Product[]>([])
const collections = ref<Collection[]>([])
const reviews = ref<Review[]>([])
const loading = ref(true)

const featuredCollections = computed(() => 
  collections.value.filter(collection => collection.metadata?.featured)
)

const getProductReviewsList = (productId: string) => {
  return reviews.value.filter(review => 
    review.metadata?.product?.id === productId
  )
}

onMounted(async () => {
  try {
    const [productsData, collectionsData, reviewsData] = await Promise.all([
      getProducts(),
      getCollections(),
      getReviews()
    ])
    
    products.value = productsData
    collections.value = collectionsData
    reviews.value = reviewsData
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})
</script>