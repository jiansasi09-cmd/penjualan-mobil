<template>
  <div class="border rounded shadow p-4">
    <h3 class="font-semibold">{{ mobil.nama }}</h3>
    <p class="text-sm text-gray-500">{{ mobil.merk }}</p>
    <p class="font-bold mt-2">Rp {{ mobil.harga }}</p>

    <div class="flex justify-between mt-4">
      <FavoritButton :mobilId="mobil.id" />
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
import FavoritButton from './FavoritButton.vue'

defineProps({
  mobil: Object
})
</script>
