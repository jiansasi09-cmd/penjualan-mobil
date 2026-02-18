<template>
  <div class="p-6">

    <h1 class="text-xl font-bold mb-4">
      Laporan Pembelian
    </h1>

    <ReportPembelianTable :data="pembelian"/>

  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import ReportPembelianTable from '@/components/admin/ReportPembelianTable.vue'
import { getReportPembelian } from '@/services/reportPembelian.service'

const pembelian = ref([])

onMounted(async () => {

  try {

    pembelian.value = await getReportPembelian()


  } catch (err) {

    console.error(err)

  }

})

</script>
