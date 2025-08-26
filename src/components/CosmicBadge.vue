<template>
  <div 
    v-if="isVisible"
    class="fixed bottom-5 right-5 z-50 transition-colors duration-200 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-44 font-system"
  >
    <!-- Close button -->
    <button
      @click="handleDismiss"
      class="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200"
      aria-label="Dismiss badge"
    >
      ×
    </button>
    
    <!-- Main badge content -->
    <a
      :href="badgeUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 text-gray-800 text-sm font-medium no-underline hover:bg-gray-50 transition-colors duration-200 -m-3 p-3 rounded-lg"
    >
      <img 
        src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
        alt="Cosmic Logo" 
        class="w-5 h-5"
      />
      Built with Cosmic
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  bucketSlug: string
}

const props = defineProps<Props>()

const isVisible = ref(false)

const badgeUrl = computed(() => {
  return `https://www.cosmicjs.com?utm_source=bucket_${props.bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`
})

onMounted(() => {
  // Show badge after a short delay and check if previously dismissed
  const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
  if (!isDismissed) {
    const timer = setTimeout(() => {
      isVisible.value = true
    }, 1000)
    return () => clearTimeout(timer)
  }
})

const handleDismiss = () => {
  isVisible.value = false
  localStorage.setItem('cosmic-badge-dismissed', 'true')
}
</script>

<style scoped>
.font-system {
  font-family: system-ui, -apple-system, sans-serif;
}
</style>