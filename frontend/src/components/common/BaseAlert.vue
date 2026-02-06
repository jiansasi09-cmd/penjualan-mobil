<template>
  <div
    v-if="show"
    :class="[
      'px-4 py-3 rounded mb-4 text-sm',
      type === 'error' && 'bg-red-100 text-red-700',
      type === 'success' && 'bg-green-100 text-green-700',
      type === 'info' && 'bg-blue-100 text-blue-700'
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'info'
  }
})
</script>
