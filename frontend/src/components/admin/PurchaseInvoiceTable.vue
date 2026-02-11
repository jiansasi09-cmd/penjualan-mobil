<template>
  <BaseTable
    :headers="['Nomor', 'Tanggal', 'PO', 'Total', 'Status']"
    :keys="['nomor', 'tanggal', 'poKode', 'total', 'status']"
    :data="formattedData"
  >
    <template #cell-total="{ value }">
      Rp {{ Number(value).toLocaleString('id-ID') }}
    </template>

    <template #cell-status="{ value }">
      <span
        :class="{
          'text-red-600 font-semibold': value === 'BELUM_LUNAS',
          'text-green-600 font-semibold': value === 'LUNAS'
        }"
      >
        {{ value }}
      </span>
    </template>

    <template #action="{ row }">
      <router-link
        :to="`/admin/purchase-invoice/detail/${row.id}`"
        class="text-blue-600 hover:underline"
      >
        Detail
      </router-link>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'

const props = defineProps({
  data: Array
})

const formattedData = computed(() =>
  props.data.map(inv => ({
    id: inv.id,
    nomor: inv.nomor,
    tanggal: new Date(inv.tanggal).toLocaleDateString('id-ID'),
    poKode: inv.gr?.po?.kode || '-',
    total: inv.total,
    status: inv.status
  }))
)
</script>
