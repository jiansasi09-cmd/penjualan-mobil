<template>
  <BaseTable
    :headers="['Nomor', 'Tanggal', 'Sales', 'Total', 'Status']"
    :keys="['nomor', 'tanggal', 'sales', 'total', 'status']"
    :data="formattedData"
  >
    <template #status="{ row }">
      <span
        :class="getStatusClass(row.status)"
        class="px-2 py-1 rounded text-xs font-semibold"
      >
        {{ row.status }}
      </span>
    </template>

    <template #action="{ row }">
      <RouterLink
        :to="`/admin/report/penjualan/${row.id}`"
        class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
      >
        Detail
      </RouterLink>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const formatRupiah = (value) => {
  if (!value) return "Rp 0"
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value)
}

const formattedData = computed(() => {
  return props.data.map(d => ({
    id: d.id,
    nomor: d.nomor || `SALE-${d.id}`,
    tanggal: d.tanggal ? new Date(d.tanggal).toLocaleDateString('id-ID') : '-',
    sales: d.sales?.nama || '-',
    total: formatRupiah(d.total),
    status: d.status || 'UNPAID'
  }))
})

const getStatusClass = (status) => {
  if (status === "PAID") return "bg-green-100 text-green-700"
  if (status === "PARTIAL") return "bg-yellow-100 text-yellow-700"
  if (status === "UNPAID") return "bg-red-100 text-red-700"
  return "bg-gray-100 text-gray-700"
}
</script>
