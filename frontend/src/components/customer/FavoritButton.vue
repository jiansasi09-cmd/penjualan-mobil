<template>
  <button
    @click="toggle"
    class="text-sm"
    :class="isFavorit ? 'text-red-600' : 'text-gray-400'"
  >
    ♥ Favorit
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { toggleFavorit } from '@/services/favorit.service'

const props = defineProps({
  mobilId: Number
})

const isFavorit = ref(false)

const toggle = async () => {
  await toggleFavorit(props.mobilId)
  isFavorit.value = !isFavorit.value
}
</script>
