<template>
  <div>
    <p class="text-sm text-gray-500">{{ label }}</p>
    <p class="font-semibold">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number]
})
</script>
