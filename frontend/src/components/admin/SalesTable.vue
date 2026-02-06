<template>
  <BaseTable
    :headers="['Nama', 'No Telp', 'Alamat', 'Aksi']"
    :keys="['nama', 'noTelp', 'alamat']"
    :data="data"
  >
    <template #aksi="{ row }">
      <router-link
        :to="`/admin/sales/edit/${row.id}`"
        class="text-blue-600 hover:underline mr-3"
      >
        Edit
      </router-link>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'

defineProps({
  data: Array
})
</script>
