<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 rounded text-white font-medium
           bg-blue-600 hover:bg-blue-700
           disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
