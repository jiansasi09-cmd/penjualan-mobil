<template>
  <BaseTable
    :headers="['Tanggal', 'Total']"
    :keys="['tanggal', 'total']"
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
