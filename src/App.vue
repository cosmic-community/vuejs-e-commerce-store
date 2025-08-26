<template>
  <div id="app">
    <Header />
    <main class="min-h-screen">
      <RouterView />
    </main>
    <Footer />
    <CosmicBadge :bucketSlug="bucketSlug" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CosmicBadge from './components/CosmicBadge.vue'

const bucketSlug = computed(() => import.meta.env.VITE_COSMIC_BUCKET_SLUG as string)
</script>