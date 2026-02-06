<template>
  <div>

    <h1 class="text-xl font-bold p-4">Pesanan Saya</h1>

    <div class="p-4 space-y-3">
      <PesananCard
        v-for="p in pesanan"
        :key="p.id"
        :data="p"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getPesanan } from '@/services/pesanan.service'

import CustomerNavbar from '@/components/customer/CustomerNavbar.vue'
import PesananCard from '@/components/customer/PesananCard.vue'

const pesanan = ref([])

onMounted(async () => {
  pesanan.value = await getPesanan()
})
</script>
