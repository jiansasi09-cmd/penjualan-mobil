<template>
  <RouterLink
    :to="to"
    class="block px-4 py-2 rounded hover:bg-gray-100"
    :class="isActive ? 'bg-blue-100 font-semibold text-blue-700' : ''"
  >
    {{ label }}
  </RouterLink>
</template>

<script setup>
import { useRoute } from 'vue-router'

const props = defineProps({
  to: String,
  label: String
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
