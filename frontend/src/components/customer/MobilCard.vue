<template>
  <div class="border rounded shadow p-4">
    <h3 class="font-semibold">{{ mobil.nama }}</h3>
    <p class="text-sm text-gray-500">{{ mobil.merk }}</p>
    <p class="font-bold mt-2">Rp {{ mobil.harga.toLocaleString() }}</p>

    <div class="flex justify-between mt-4 items-center">
      <!-- tombol favorit -->
      <button
        class="px-3 py-1 rounded text-white"
        :class="isFavorit ? 'bg-red-500' : 'bg-gray-400'"
        @click="$emit('toggle-favorit', mobil.id, isFavorit)"
      >
        {{ isFavorit ? '💖 Favorit' : '🤍 Tambah Favorit' }}
      </button>

      <!-- tombol booking -->
      <RouterLink
        :to="`/customer/booking/${mobil.id}`"
        class="text-blue-600 text-sm"
      >
        Booking
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  mobil: Object,
  favoritList: Array,
  default: () => []
})

const emits = defineEmits(['toggle-favorit'])

// cek apakah mobil ini sudah ada di favorit
const isFavorit = computed(() => {
  return props.favoritList.some(f => f.mobilId === props.mobil.id)
})
</script>
