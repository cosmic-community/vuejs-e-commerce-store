<template>
  <div id="app" class="min-h-screen bg-white flex flex-col">
    <Header />
    
    <main class="flex-grow">
      <RouterView />
    </main>
    
    <Footer />
    
    <!-- Cosmic Badge -->
    <CosmicBadge :bucketSlug="bucketSlug" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CosmicBadge from '@/components/CosmicBadge.vue'

// Type-safe environment variable access
const bucketSlug = computed(() => {
  return (import.meta.env as any).VITE_COSMIC_BUCKET_SLUG as string || 'demo-bucket'
})
</script>