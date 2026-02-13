<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Stok Mobil</h1>

    <BaseButton @click="openForm(null)" variant="primary" class="mb-4">
      Tambah Stok
    </BaseButton>

    <!-- Panggil Table -->
    <StockTable
      :stockList="stockList"
      @edit="openForm"
      @detail="openDetail"
      @delete="hapus"
    />

    <!-- Modal Form -->
    <StockForm
      v-if="showForm"
      :stock="selectedStock"
      @close="closeForm"
      @saved="loadStock"
    />

    <!-- Modal Detail -->
    <StockDetail
      v-if="showDetail"
      :stock="selectedStock"
      @close="closeDetail"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStock, deleteStock } from '@/services/stock.service'
import StockDetail from '@/views/admin/StockDetail.vue'
import StockTable from '@/components/admin/StockTable.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StockForm from '@/components/admin/StockForm.vue'

const stockList = ref([])
const showForm = ref(false)
const showDetail = ref(false)
const selectedStock = ref(null)

// ================= LOAD DATA =================
const loadStock = async () => {
  try {
    stockList.value = await getStock()
  } catch (err) {
    console.error('Gagal ambil data stok:', err)
  }
}

onMounted(loadStock)

// ================= FORM =================
const openForm = (stock = null) => {
  selectedStock.value = stock ? { ...stock } : null
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedStock.value = null
}

// ================= DETAIL =================
const openDetail = (stock) => {
  selectedStock.value = stock
  showDetail.value = true
}

const closeDetail = () => {
  showDetail.value = false
  selectedStock.value = null
}

// ================= DELETE =================
const hapus = async (id) => {
  if (!confirm('Yakin ingin menghapus stok ini?')) return

  try {
    await deleteStock(id)
    await loadStock()
  } catch (err) {
    console.error('Gagal hapus stok:', err)
  }
}
</script>

