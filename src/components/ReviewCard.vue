<template>
  <div class="card p-6">
    <!-- Review Header -->
    <div class="flex items-start justify-between mb-4">
      <div>
        <h4 class="font-semibold text-gray-900">
          {{ review.metadata?.customer_name || 'Anonymous' }}
        </h4>
        <div class="flex items-center mt-1">
          <StarRating :rating="ratingValue" />
          <span class="ml-2 text-sm text-gray-600">
            {{ review.metadata?.rating?.value || 'No rating' }}
          </span>
        </div>
      </div>
      
      <!-- Verified Purchase Badge -->
      <div v-if="review.metadata?.verified_purchase" class="flex items-center">
        <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="text-xs text-green-600 font-medium">Verified Purchase</span>
      </div>
    </div>

    <!-- Review Title -->
    <h5 v-if="review.metadata?.title" class="font-medium text-gray-900 mb-2">
      {{ review.metadata.title }}
    </h5>

    <!-- Review Comment -->
    <p v-if="review.metadata?.comment" class="text-gray-700 leading-relaxed">
      {{ review.metadata.comment }}
    </p>

    <!-- Product Reference -->
    <div v-if="showProduct && review.metadata?.product" class="mt-4 pt-4 border-t border-gray-200">
      <RouterLink 
        :to="`/products/${review.metadata.product.slug}`"
        class="flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors"
      >
        <img 
          v-if="productImage"
          :src="`${productImage.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`"
          :alt="review.metadata.product.title"
          class="w-10 h-10 object-cover rounded mr-3"
        />
        <div>
          <p class="font-medium">{{ review.metadata.product.title }}</p>
          <p class="text-gray-500">View Product</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Review } from '@/types'
import StarRating from './StarRating.vue'

interface Props {
  review: Review
  showProduct?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showProduct: false
})

const ratingValue = computed(() => {
  const ratingKey = props.review.metadata?.rating?.key
  return ratingKey ? parseInt(ratingKey) : 0
})

const productImage = computed(() => {
  const product = props.review.metadata?.product
  const images = product?.metadata?.images
  return images && images.length > 0 ? images[0] : null
})
</script>