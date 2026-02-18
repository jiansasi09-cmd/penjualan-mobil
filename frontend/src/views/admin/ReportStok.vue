<template>

  <div class="p-6">

    <h1 class="text-xl font-bold mb-4">
      Laporan Stok Mobil
    </h1>

    <ReportStokTable :data="stok" />

  </div>

</template>


<script setup>

import { ref, onMounted } from 'vue'

import ReportStokTable from '@/components/admin/ReportStokTable.vue'

import { getReportStok } from '@/services/reportStok.service'


const stok = ref([])


onMounted(async () => {

  try {

    stok.value = await getReportStok()

  }

  catch (err) {

    console.error(err)

  }

})

</script>
