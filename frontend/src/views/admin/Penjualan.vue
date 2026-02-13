<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Penjualan</h1>

    <div class="mb-4">
      <RouterLink
        to="/admin/penjualan/create"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tambah Penjualan
      </RouterLink>
    </div>

    <PenjualanTable
      :data="penjualan"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPenjualan, deletePenjualan } from '@/services/penjualan.service'
import PenjualanTable from '@/components/admin/PenjualanTable.vue'

const penjualan = ref([])

const loadPenjualan = async () => {
  try {
    penjualan.value = await getPenjualan()
  } catch (err) {
    console.error('Gagal load penjualan:', err)
    alert('Gagal memuat data penjualan')
  }
}

onMounted(loadPenjualan)

const handleDelete = async (id) => {
  if (!confirm('Yakin ingin menghapus penjualan ini?')) return
  try {
    await deletePenjualan(id)
    alert('Penjualan berhasil dihapus')
    loadPenjualan()
  } catch (err) {
    console.error(err)
    alert('Gagal menghapus penjualan')
  }
}
</script>
