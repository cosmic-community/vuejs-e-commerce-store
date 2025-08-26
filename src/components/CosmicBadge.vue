<template>
  <div 
    v-if="isVisible"
    class="fixed bottom-5 right-5 z-50 transition-colors duration-200"
    :style="badgeStyle"
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
      :href="cosmicUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 text-gray-800 text-sm font-medium no-underline"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
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
import { ref, computed, onMounted } from 'vue'

interface Props {
  bucketSlug: string
}

const props = defineProps<Props>()

const isVisible = ref(false)
const isHovered = ref(false)

const badgeStyle = computed(() => ({
  position: 'fixed' as const,
  backgroundColor: isHovered.value ? '#f9fafb' : 'white',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  padding: '12px 16px',
  width: '180px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
}))

const cosmicUrl = computed(() => 
  `https://www.cosmicjs.com?utm_source=bucket_${props.bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`
)

const handleDismiss = () => {
  isVisible.value = false
  localStorage.setItem('cosmic-badge-dismissed', 'true')
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

onMounted(() => {
  // Show badge after a short delay and check if previously dismissed
  const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
  if (!isDismissed) {
    const timer = setTimeout(() => {
      isVisible.value = true
    }, 1000)
    
    // Cleanup timer on unmount
    return () => clearTimeout(timer)
  }
})
</script>