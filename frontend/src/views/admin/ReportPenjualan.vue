<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Laporan Penjualan</h1>

    <ReportPenjualanTable :data="penjualan" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ReportPenjualanTable from '@/components/admin/ReportPenjualanTable.vue'
import { getReportPenjualan } from '@/services/reportPenjualan.service'

const penjualan = ref([])

onMounted(async () => {
  try {
    penjualan.value = await getReportPenjualan()
  } catch (err) {
    console.error('Gagal load report penjualan:', err)
  }
})
</script>
