<template>
  <div class="bg-white rounded-xl shadow p-5">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500">{{ title }}</p>
        <p class="text-2xl font-bold">{{ value }}</p>
      </div>
      <div class="text-3xl">{{ icon }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String
})
</script>
