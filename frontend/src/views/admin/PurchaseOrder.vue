<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Purchase Order</h1>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded mb-3"
      @click="showPRModal = true"
    >
      Buat PO dari PR
    </button>

    <!-- Modal Daftar PR -->
    <div v-if="showPRModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow w-2/3">
        <h2 class="text-lg font-bold mb-4">Pilih PR</h2>
        <table class="w-full border">
          <thead>
            <tr>
              <th class="border p-2">PR Number</th>
              <th class="border p-2">Tanggal</th>
              <th class="border p-2">Status</th>
              <th class="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pr in prs" :key="pr.id">
              <td class="border p-2">{{ pr.prNumber }}</td>
              <td class="border p-2">{{ formatDate(pr.tanggal) }}</td>
              <td class="border p-2">{{ pr.status }}</td>
              <td class="border p-2">
                <button
                  class="bg-green-500 text-white px-2 py-1 rounded"
                  @click="createPO(pr.id)"
                  :disabled="pr.status !== 'APPROVED'"
                >
                  Buat PO
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button class="mt-3 px-4 py-2 bg-gray-500 text-white rounded" @click="showPRModal = false">Tutup</button>
      </div>
    </div>

    <!-- Tabel PO -->
    <table class="w-full border mt-4">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">Kode</th>
          <th class="border p-2">Tanggal</th>
          <th class="border p-2">Supplier</th>
          <th class="border p-2">Status</th>
          <th class="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="po in purchaseOrders" :key="po.id">
          <td class="border p-2">{{ po.kode }}</td>
          <td class="border p-2">{{ formatDate(po.tanggal) }}</td>
          <td class="border p-2">{{ po.supplier?.nama }}</td>
          <td class="border p-2">{{ po.status }}</td>
          <td class="border p-2">
            <RouterLink :to="`/admin/purchase-order/edit/${po.id}`" class="text-blue-600">Edit</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPOs, createPOFromPR } from '@/services/purchaseOrder.service'
import { getPRs } from '@/services/purchaseRequest.service'

const purchaseOrders = ref([])
const prs = ref([])
const showPRModal = ref(false)

const getData = async () => {
  try {
    purchaseOrders.value = await getPOs()
  } catch (err) {
    console.error('Gagal ambil PO:', err)
  }
}

const getPRData = async () => {
  try {
    // Ambil semua PR APPROVED
    const data = await getPRs()
    prs.value = data.filter(p => p.status === 'APPROVED')
  } catch (err) {
    console.error('Gagal ambil PR:', err)
  }
}

const createPO = async (prId) => {
  try {
    await createPOFromPR(prId)
    alert('PO berhasil dibuat!')
    showPRModal.value = false
    getData() // refresh tabel PO
  } catch (err) {
    console.error('Gagal buat PO:', err)
    alert(err.response?.data?.message || 'Gagal buat PO')
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString('id-ID')

onMounted(() => {
  getData()
  getPRData()
})
</script>
