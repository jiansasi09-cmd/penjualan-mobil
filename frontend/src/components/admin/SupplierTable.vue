<template>
  <BaseTable
    :headers="['Nama Supplier', 'No Telp', 'Alamat']"
    :keys="['nama', 'noTelp', 'alamat']"
    :data="data"
  >
    <template #action="{ row }">
      <div class="flex gap-3">
        <router-link
          :to="`/admin/supplier/detail/${row.id}`"
          class="text-blue-600 hover:underline"
        >
          Detail
        </router-link>

        <router-link
          :to="`/admin/supplier/edit/${row.id}`"
          class="text-yellow-600 hover:underline"
        >
          Edit
        </router-link>
      </div>
    </template>
  </BaseTable>
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
