<template>
  <BaseTable
    :headers="HEADERS"
    :keys="KEYS"
    :data="formattedData"
  >
    <!-- Status PO -->
    <template #cell-status="{ value }">
      <span
        :class="{
          'text-green-600 font-semibold': value === 'DIKIRIM',
          'text-yellow-600 font-semibold': value === 'PENDING',
          'text-red-600 font-semibold': value === 'DITERIMA'
        }"
      >
        {{ value }}
      </span>
    </template>

    <!-- Aksi PO -->
    <template #action="{ row }">
      <div class="flex gap-3 items-center">
        <!-- Detail PO -->
        <router-link
          :to="`/admin/purchase-order/detail/${row.id}`"
          class="text-gray-600 hover:underline"
        >
          Detail
        </router-link>

        <!-- Terima Barang -->
          <RouterLink
            v-if="row.status === 'DIKIRIM'"
            :to="{
              path: '/admin/goods-receipt/create',
              query: { poId: row.id }
            }"
            class="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Terima Barang
          </RouterLink>



        <!-- Hapus PO -->
        <button
          class="text-red-600 hover:underline"
          @click="onDelete(row)"
        >
          Hapus
        </button>
      </div>
    </template>
  </BaseTable>
</template>
<script setup>
import { computed } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'

const emit = defineEmits(['delete'])

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const HEADERS = ['Kode PO', 'Supplier', 'Tanggal', 'Status']
const KEYS = ['kode', 'supplier', 'tanggal', 'status']

const formattedData = computed(() =>
  props.data.map(po => ({
    id: po.id,
    kode: po.kode,
    supplier: po.supplier?.nama || '-',
    status: po.status,
    tanggal: po.createdAt
      ? new Date(po.createdAt).toLocaleDateString('id-ID')
      : '-'
  }))
)

const onDelete = (row) => {
  emit('delete', row.id)
}
</script>
