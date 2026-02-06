<template>
  <span
    class="px-2 py-1 rounded text-xs text-white"
    :class="color"
  >
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: String
})

const color = computed(() => {
  switch (props.status) {
    case 'SELESAI':
      return 'bg-green-600'
    case 'DITOLAK':
      return 'bg-red-600'
    default:
      return 'bg-yellow-500'
  }
})
</script>
