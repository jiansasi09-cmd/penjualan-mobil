<template>
  <BaseTable
    :headers="['Nomor', 'Tanggal', 'Total', 'Sales']"
    :keys="['nomor', 'tanggal', 'total', 'sales']"
    :data="formattedData"
  >
    <template #action="{ row }">
      <div class="flex gap-1">
        <RouterLink
          :to="`/admin/penjualan/${row.id}`"
          class="bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
          Detail
        </RouterLink>
        <RouterLink
          :to="`/admin/penjualan/${row.id}/edit`"
          class="bg-green-500 text-white px-2 py-1 rounded text-xs"
        >
          Edit
        </RouterLink>
        <button
          @click="$emit('delete', row.id)"
          class="bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          Hapus
        </button>
      </div>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

// Tangkap props
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

// Buat computed agar format tanggal, total, dan sales rapi
const formattedData = computed(() => {
  return props.data.map(d => ({
    id: d.id,
    nomor: d.nomor || `SALE-${d.id}`,
    tanggal: d.tanggal ? new Date(d.tanggal).toLocaleDateString() : '-',
    total: d.total != null ? d.total.toLocaleString() : '0',
    sales: d.sales ? d.sales.nama : '-'
  }))
})
</script>
