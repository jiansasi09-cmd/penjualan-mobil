<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Penjualan</h1>

    <!-- tombol tambah -->
    <div class="mb-4">
      <RouterLink
        to="/admin/penjualan/create"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Tambah Penjualan
      </RouterLink>
    </div>

    <!-- loading -->
    <div v-if="loading" class="text-gray-500">
      Memuat data...
    </div>

    <!-- table -->
    <PenjualanTable
      v-else
      :data="penjualan"
      @delete="handleDelete"
      @refresh="loadPenjualan"
    />

    <!-- kosong -->
    <div v-if="!loading && penjualan.length === 0" class="text-gray-500 mt-4">
      Belum ada data penjualan
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPenjualan, deletePenjualan } from '@/services/penjualan.service'
import PenjualanTable from '@/components/admin/PenjualanTable.vue'

const penjualan = ref([])
const loading = ref(false)

const loadPenjualan = async () => {
  loading.value = true
  try {
    const res = await getPenjualan()

    // pastikan selalu array
    penjualan.value = Array.isArray(res) ? res : []

  } catch (err) {
    console.error('Gagal load penjualan:', err)
    alert('Gagal memuat data penjualan')
  } finally {
    loading.value = false
  }
}

onMounted(loadPenjualan)

const handleDelete = async (id) => {
  try {
    const ok = confirm('Yakin ingin menghapus penjualan ini?')
    if (!ok) return

    loading.value = true

    await deletePenjualan(id)

    alert('Penjualan berhasil dihapus')

    await loadPenjualan()

  } catch (err) {
    console.error('Delete error:', err)
    alert('Gagal menghapus penjualan')
  } finally {
    loading.value = false
  }
}
</script>
