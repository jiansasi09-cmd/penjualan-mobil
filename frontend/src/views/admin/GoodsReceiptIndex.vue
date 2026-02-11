<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Goods Receipt</h1>

    <BaseTable
      :headers="HEADERS"
      :keys="KEYS"
      :data="grData"
    >
      <!-- Custom cell untuk status -->
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

      <!-- Aksi -->
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
            @click="handleDelete(row.id)"
          >
            Hapus
          </button>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import api from '@/services/api'

const grData = ref([])

// Headers & keys untuk BaseTable
const HEADERS = ['Kode GR', 'PO', 'Supplier', 'Tanggal', 'Status']
const KEYS = ['kode', 'poKode', 'supplier', 'tanggal', 'status']

// Fetch semua GR
const loadGR = async () => {
  try {
    const res = await api.get('/goods-receipt/admin')
    grData.value = res.data.map(gr => ({
      id: gr.id,
      kode: gr.kode || '-',
      poKode: gr.po?.kode || '-',
      supplier: gr.po?.supplier?.nama || '-',
      tanggal: gr.createdAt
        ? new Date(gr.createdAt).toLocaleDateString('id-ID')
        : '-',
      status: gr.status || '-'
    }))
  } catch (err) {
    console.error('Gagal load Goods Receipt:', err)
    alert('Gagal load Goods Receipt')
  }
}

// Delete GR
const handleDelete = async (id) => {
  if (!confirm('Yakin ingin menghapus GR ini?')) return
  try {
    await api.delete(`/goods-receipt/${id}`)
    alert('GR berhasil dihapus')
    await loadGR() // refresh tabel
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || 'Gagal hapus GR')
  }
}

// Load data saat halaman dibuka
onMounted(loadGR)
</script>
