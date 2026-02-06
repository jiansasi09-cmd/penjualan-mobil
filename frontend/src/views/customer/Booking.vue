<template>
  <div>

    <h1 class="text-xl font-bold p-4">Booking Mobil</h1>

    <BookingForm @success="load" />

    <div class="p-4">
      <PesananCard
        v-for="b in booking"
        :key="b.id"
        :data="b"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getBooking } from '@/services/booking.service'

import CustomerNavbar from '@/components/customer/CustomerNavbar.vue'
import BookingForm from '@/components/customer/BookingForm.vue'
import PesananCard from '@/components/customer/PesananCard.vue'

const booking = ref([])

const load = async () => {
  booking.value = await getBooking()
}

onMounted(load)
</script>
