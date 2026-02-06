<template>
  <BaseTable
    :headers="['Nama', 'No Telp', 'Alamat']"
    :keys="['nama', 'noTelp', 'alamat']"
    :data="data"
  />
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>
