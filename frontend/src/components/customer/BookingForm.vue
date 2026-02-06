<template>
  <form @submit.prevent="submit" class="space-y-4">
    <h2 class="font-semibold text-lg">Booking Mobil</h2>

    <input
      type="date"
      v-model="tanggal"
      class="border px-3 py-2 rounded w-full"
      required
    />

    <button class="bg-blue-600 text-white px-4 py-2 rounded">
      Booking
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { createBooking } from '@/services/booking.service'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tanggal = ref('')

const submit = async () => {
  await createBooking({
    mobilId: route.params.id,
    tanggal
  })

  router.push('/customer/pesanan')
}
</script>
