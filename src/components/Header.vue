<template>
  <header class="bg-white shadow-md sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-bold text-primary-600">
            Vue Store
          </RouterLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink 
            to="/" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Home
          </RouterLink>
          <div class="relative" @mouseleave="showCollections = false">
            <button
              @mouseenter="showCollections = true"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              Collections
              <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Collections Dropdown -->
            <div 
              v-show="showCollections"
              @mouseenter="showCollections = true"
              class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
            >
              <RouterLink
                v-for="collection in collections"
                :key="collection.id"
                :to="`/collections/${collection.slug}`"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              >
                {{ collection.metadata?.name || collection.title }}
              </RouterLink>
            </div>
          </div>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            type="button"
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
        <RouterLink 
          to="/" 
          class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
          @click="mobileMenuOpen = false"
        >
          Home
        </RouterLink>
        <div class="px-3 py-2 text-gray-500 text-sm font-medium">Collections</div>
        <RouterLink
          v-for="collection in collections"
          :key="collection.id"
          :to="`/collections/${collection.slug}`"
          class="text-gray-600 hover:text-primary-600 block px-6 py-2 rounded-md text-sm"
          @click="mobileMenuOpen = false"
        >
          {{ collection.metadata?.name || collection.title }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getCollections } from '@/lib/cosmic'
import type { Collection } from '@/types'

const collections = ref<Collection[]>([])
const showCollections = ref(false)
const mobileMenuOpen = ref(false)

onMounted(async () => {
  try {
    collections.value = await getCollections()
  } catch (error) {
    console.error('Error loading collections:', error)
  }
})
</script>