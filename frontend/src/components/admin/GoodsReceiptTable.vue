<template #action="{ row }">
  <div class="flex gap-3 items-center">
    <router-link
      :to="`/admin/goods-receipt/detail/${row.id}`"
      class="text-gray-600 hover:underline"
    >
      Detail
    </router-link>

    <router-link
      :to="`/admin/goods-receipt/edit/${row.id}`"
      class="text-blue-600 hover:underline"
    >
      Edit
    </router-link>

    <button
      class="text-red-600 hover:underline"
      @click="onDelete(row)"
    >
      Hapus
    </button>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'

const emit = defineEmits(['delete']) // ✅ INI YANG KURANG

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const headers = ['Kode', 'PO', 'Tanggal']
const keys = ['kode', 'poKode', 'tanggal']

const formattedData = computed(() =>
  props.data.map(gr => ({
    id: gr.id,
    kode: gr.kode || '-',
    poKode: gr.po?.kode || '-',
    tanggal: gr.createdAt
      ? new Date(gr.createdAt).toLocaleDateString('id-ID')
      : '-'
  }))
)
</script>
