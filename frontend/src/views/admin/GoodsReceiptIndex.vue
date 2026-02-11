<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Goods Receipt</h1>

    <GoodsReceiptTable
      :data="grData"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GoodsReceiptTable from '@/components/admin/GoodsReceiptTable.vue'
import api from '@/services/api'

const grData = ref([])

const loadGR = async () => {
  const res = await api.get('/goods-receipt/admin')

  grData.value = res.data.map(gr => ({
    id: gr.id,
    kode: gr.kode || '-',
    poKode: gr.po?.kode || '-',
    supplier: gr.po?.supplier?.nama || '-',
    tanggal: gr.createdAt
      ? new Date(gr.createdAt).toLocaleDateString('id-ID')
      : '-',
    status: gr.status || '-',
    hasInvoice: !!gr.invoice
  }))
}

const handleDelete = async (row) => {
  if (!confirm('Yakin ingin menghapus GR ini?')) return
  await api.delete(`/goods-receipt/${row.id}`)
  await loadGR()
}

onMounted(loadGR)
</script>
