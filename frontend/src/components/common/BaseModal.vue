<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-black">✕</button>
      </div>

      <slot />

      <div class="mt-4 text-right">
        <BaseButton @click="$emit('close')">Tutup</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  show: Boolean,
  title: String
})

defineEmits(['close'])
</script>
