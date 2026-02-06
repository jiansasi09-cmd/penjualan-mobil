<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Pembayaran</h1>
    <PembayaranTable :data="pembayaran" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPembayaran } from '@/services/pembayaran.service'
import PembayaranTable from '@/components/admin/PembayaranTable.vue'

const pembayaran = ref([])

onMounted(async () => {
  try {
    pembayaran.value = await getPembayaran()
  } catch (err) {
    console.error('Gagal load pembayaran:', err)
  }
})
</script>
