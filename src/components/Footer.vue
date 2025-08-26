<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-xl font-bold text-white mb-4">Vue Store</h3>
          <p class="text-gray-300 max-w-md">
            Discover amazing products from our curated collections. Built with Vue.js and powered by Cosmic CMS.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="text-gray-300 hover:text-white transition-colors">
                Home
              </RouterLink>
            </li>
            <li v-for="collection in collections" :key="collection.id">
              <RouterLink 
                :to="`/collections/${collection.slug}`" 
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ collection.metadata?.name || collection.title }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-300">
            <li>support@vuestore.com</li>
            <li>1-800-VUE-STORE</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-300">
          &copy; {{ currentYear }} Vue Store. Built with Vue.js and Cosmic CMS.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getCollections } from '@/lib/cosmic'
import type { Collection } from '@/types'

const collections = ref<Collection[]>([])
const currentYear = computed(() => new Date().getFullYear())

onMounted(async () => {
  try {
    collections.value = await getCollections()
  } catch (error) {
    console.error('Error loading collections:', error)
  }
})
</script>