<template>
  <div class="bg-surface rounded-xl shadow-sm p-5
            hover:shadow-md transition">
    <div>
      <p class="text-sm text-text-secondary">
        {{ title }}
      </p>
      <p class="text-2xl font-semibold mt-1">
        {{ value }}
      </p>
    </div>

    <div class="text-3xl">
      {{ icon }}
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
