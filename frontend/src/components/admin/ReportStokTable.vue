<template>

<BaseTable

  :headers="['Nama Mobil', 'Merk', 'Tipe', 'Tahun', 'Stok']"

  :keys="['nama', 'merk', 'tipe', 'tahun', 'stok']"

  :data="formattedData"

>

  <template #action="{ row }">

    <RouterLink

      :to="`/admin/report/stok/${row.id}`"

      class="bg-blue-500 text-white px-2 py-1 rounded text-xs"

    >

      Detail

    </RouterLink>

  </template>

</BaseTable>

</template>



<script setup>

import BaseTable from '@/components/common/BaseTable.vue'

import { RouterLink } from 'vue-router'

import { computed } from 'vue'


const props = defineProps({

  data: {

    type: Array,

    default: () => []

  }

})


const formattedData = computed(() => {

  return props.data.map(m => ({

    id: m.id,

    nama: m.nama,

    merk: m.merk,

    tipe: m.tipe,

    tahun: m.tahun,

    stok: m.stok

  }))

})

</script>
