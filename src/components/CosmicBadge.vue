<template>
  <a
    v-if="isVisible"
    :href="`https://www.cosmicjs.com?utm_source=bucket_${bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-5 right-5 flex items-center gap-2 text-gray-800 text-sm font-medium no-underline transition-colors duration-200 z-50"
    :style="badgeStyles"
    @mouseenter="hoverBackground = '#f9fafb'"
    @mouseleave="hoverBackground = 'white'"
  >
    <!-- Close button -->
    <button
      @click.prevent.stop="handleDismiss"
      class="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 z-10"
      aria-label="Dismiss badge"
    >
      ×
    </button>
    
    <img 
      src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
      alt="Cosmic Logo" 
      class="w-5 h-5"
    />
    Built with Cosmic
  </a>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  bucketSlug: string
}

const props = defineProps<Props>()

const isVisible = ref(false)
const hoverBackground = ref('white')

const badgeStyles = computed(() => ({
  position: 'fixed',
  backgroundColor: hoverBackground.value,
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  padding: '12px 16px',
  width: '180px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
}))

const handleDismiss = () => {
  isVisible.value = false
  localStorage.setItem('cosmic-badge-dismissed', 'true')
}

onMounted(() => {
  // Show badge after a short delay and check if previously dismissed
  const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
  if (!isDismissed) {
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  }
})
</script>