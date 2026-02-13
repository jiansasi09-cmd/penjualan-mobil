<template>
  <BaseTable
    :headers="['Penjualan', 'Jumlah', 'Metode', 'Tanggal']"
    :keys="['penjualan', 'jumlah', 'metode', 'tanggal']"
    :data="formattedData"
  >
    <template #action="{ row }">
      <div class="flex gap-1">

        <RouterLink
          :to="`/admin/pembayaran/${row.id}`"
          class="bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
          Detail
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
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  data: Array
})

const formattedData = computed(() => {
  return props.data.map(p => ({
    id: p.id,
    penjualan: p.penjualan?.nomor || '-',
    jumlah: p.jumlah?.toLocaleString() || '0',
    metode: p.metode || '-',
    tanggal: new Date(p.tanggal).toLocaleDateString()
  }))
})
</script>
