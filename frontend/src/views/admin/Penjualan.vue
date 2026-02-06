<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Penjualan</h1>
    <PenjualanTable :data="penjualan" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPenjualan } from '@/services/penjualan.service'
import PenjualanTable from '@/components/admin/PenjualanTable.vue'

const penjualan = ref([])

onMounted(async () => {
  try {
    penjualan.value = await getPenjualan()
  } catch (err) {
    console.error('Gagal load penjualan:', err)
  }
})
</script>
