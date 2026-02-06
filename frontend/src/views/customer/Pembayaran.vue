<template>
  <div>

    <h1 class="text-xl font-bold p-4">Pembayaran</h1>

    <div class="p-4 space-y-4">
      <UploadBuktiBayar
        v-for="p in pembayaran"
        :key="p.id"
        :data="p"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getPembayaranCustomer } from '@/services/pembayaranCustomer.service'

import CustomerNavbar from '@/components/customer/CustomerNavbar.vue'
import UploadBuktiBayar from '@/components/customer/UploadBuktiBayar.vue'

const pembayaran = ref([])

onMounted(async () => {
  pembayaran.value = await getPembayaranCustomer()
})
</script>
