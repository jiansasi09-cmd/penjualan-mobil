<template>
  <BaseTable
    :headers="['Jumlah', 'Metode', 'Tanggal']"
    :keys="['jumlah', 'metode', 'tanggal']"
    :data="data"
  />
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'

defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
</script>
