<template>
  <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="animate-pulse">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="aspect-square bg-gray-200 rounded-lg"></div>
        <div class="space-y-6">
          <div class="h-8 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <span class="ml-4 text-gray-700">{{ product.metadata?.name || product.title }}</span>
        </li>
      </ol>
    </nav>

    <!-- Product Detail -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <!-- Product Images -->
      <div class="space-y-4">
        <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <img 
            v-if="currentImage"
            :src="`${currentImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`"
            :alt="product.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        
        <!-- Image Thumbnails -->
        <div v-if="product.metadata?.images && product.metadata.images.length > 1" class="grid grid-cols-4 gap-4">
          <button
            v-for="(image, index) in product.metadata.images"
            :key="index"
            @click="currentImageIndex = index"
            :class="[
              'aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors',
              currentImageIndex === index ? 'border-primary-500' : 'border-transparent'
            ]"
          >
            <img 
              :src="`${image.imgix_url}?w=150&h=150&fit=crop&auto=format,compress`"
              :alt="`${product.title} ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ product.metadata?.name || product.title }}
          </h1>
          
          <!-- Price -->
          <div class="text-3xl font-bold text-primary-600 mb-4">
            ${{ formatPrice(product.metadata?.price || 0) }}
          </div>

          <!-- Rating and Reviews -->
          <div class="flex items-center mb-6">
            <StarRating :rating="averageRating" :showRating="true" />
            <span class="ml-2 text-gray-600">
              ({{ productReviews.length }} {{ productReviews.length === 1 ? 'review' : 'reviews' }})
            </span>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <span 
              v-if="product.metadata?.in_stock"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
            >
              ✓ In Stock
            </span>
            <span 
              v-else
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
            >
              ✗ Out of Stock
            </span>
          </div>
        </div>

        <!-- Description -->
        <div v-if="product.metadata?.description">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <div 
            class="prose prose-sm text-gray-700"
            v-html="product.metadata.description"
          ></div>
        </div>

        <!-- SKU -->
        <div v-if="product.metadata?.sku" class="text-sm text-gray-500">
          SKU: {{ product.metadata.sku }}
        </div>

        <!-- Collections -->
        <div v-if="collections.length > 0">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Collections</h3>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="collection in collections"
              :key="collection.id"
              :to="`/collections/${collection.slug}`"
              class="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
            >
              {{ collection.metadata?.name || collection.title }}
            </RouterLink>
          </div>
        </div>

        <!-- Add to Cart Button (Placeholder) -->
        <button
          :disabled="!product.metadata?.in_stock"
          :class="[
            'w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors',
            product.metadata?.in_stock 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          {{ product.metadata?.in_stock ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>

    <!-- Reviews Section -->
    <section>
      <div class="border-t border-gray-200 pt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        
        <div v-if="productReviews.length > 0" class="space-y-6">
          <ReviewCard 
            v-for="review in productReviews"
            :key="review.id"
            :review="review"
            :showProduct="false"
          />
        </div>

        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">⭐</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
          <p class="text-gray-600">Be the first to leave a review for this product!</p>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <div class="text-gray-400 text-6xl mb-4">🔍</div>
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
    <p class="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
    <RouterLink to="/" class="btn-primary">
      Back to Home
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getProduct, getProductReviews } from '@/lib/cosmic'
import type { Product, Review, Collection } from '@/types'
import StarRating from '@/components/StarRating.vue'
import ReviewCard from '@/components/ReviewCard.vue'

interface Props {
  slug: string
}

const props = defineProps<Props>()

const product = ref<Product | null>(null)
const productReviews = ref<Review[]>([])
const loading = ref(true)
const currentImageIndex = ref(0)

const currentImage = computed(() => {
  const images = product.value?.metadata?.images
  return images && images.length > 0 ? images[currentImageIndex.value] : null
})

const collections = computed(() => {
  const productCollections = product.value?.metadata?.collections
  if (!productCollections) return []
  
  return productCollections.filter((collection: any) => 
    typeof collection === 'object' && collection.id
  ) as Collection[]
})

const averageRating = computed(() => {
  if (productReviews.value.length === 0) return 0
  
  const ratings = productReviews.value
    .map(review => parseInt(review.metadata?.rating?.key || '0'))
    .filter(rating => rating > 0)
  
  if (ratings.length === 0) return 0
  
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
})

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

onMounted(async () => {
  try {
    const [productData, reviewsData] = await Promise.all([
      getProduct(props.slug),
      getProduct(props.slug).then(p => p ? getProductReviews(p.id) : [])
    ])
    
    product.value = productData
    productReviews.value = reviewsData
  } catch (error) {
    console.error('Error loading product:', error)
  } finally {
    loading.value = false
  }
})
</script>