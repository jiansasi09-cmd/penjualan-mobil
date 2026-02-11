<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Purchase Order</h1>

    <!-- Tombol Buat PO dari PR -->
    <button
      class="bg-blue-600 text-white px-4 py-2 rounded mb-3"
      @click="showPRModal = true"
    >
      Buat PO dari PR
    </button>

    <!-- MODAL PILIH PR -->
    <div
      v-if="showPRModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded shadow w-2/3">
        <h2 class="text-lg font-bold mb-4">Pilih PR</h2>

        <table class="w-full border">
          <thead>
            <tr class="bg-gray-100">
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

        <button
          class="mt-3 px-4 py-2 bg-gray-500 text-white rounded"
          @click="showPRModal = false"
        >
          Tutup
        </button>
      </div>
    </div>

    <!-- TABEL PO -->
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
          <td class="border p-2">{{ po.supplier?.nama || '-' }}</td>
          <td class="border p-2">{{ po.status }}</td>
          <td class="border p-2 flex gap-2">
            <!-- Edit -->
            <RouterLink
              :to="`/admin/purchase-order/edit/${po.id}`"
              class="text-blue-600 hover:underline"
            >
              Edit
            </RouterLink>

            <!-- Terima Barang -->
              <RouterLink
                v-if="po.status === 'DIKIRIM'"
                :to="{
                  path: '/admin/goods-receipt/create',
                  query: { poId: po.id }
                }"
                class="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                Terima Barang
              </RouterLink>

            <!-- Hapus -->
            <button
              class="text-red-600 hover:underline"
              @click="handleDelete(po.id)"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPOs, createPOFromPR, deletePO } from '@/services/purchaseOrder.service'
import { getPRs } from '@/services/purchaseRequest.service'

const purchaseOrders = ref([])
const prs = ref([])
const showPRModal = ref(false)

/* =====================
   LOAD PO
===================== */
const reloadPO = async () => {
  try {
    const data = await getPOs()
    purchaseOrders.value = data.filter(po => po.id)
  } catch (err) {
    console.error('Gagal ambil PO:', err)
  }
}

/* =====================
   LOAD PR
===================== */
const getPRData = async () => {
  try {
    const data = await getPRs()
    prs.value = data.filter(p => p.status === 'APPROVED')
  } catch (err) {
    console.error('Gagal ambil PR:', err)
  }
}

/* =====================
   CREATE PO
===================== */
const createPO = async (prId) => {
  try {
    await createPOFromPR(prId)
    alert('PO berhasil dibuat!')
    showPRModal.value = false
    await reloadPO()
  } catch (err) {
    console.error('Gagal buat PO:', err)
    alert(err.response?.data?.message || 'Gagal buat PO')
  }
}

/* =====================
   DELETE PO
===================== */
const handleDelete = async (id) => {
  if (!confirm('Yakin ingin menghapus PO ini?')) return

  try {
    await deletePO(id)
    await reloadPO()
    alert('PO berhasil dihapus')
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || 'Gagal menghapus PO')
  }
}

/* =====================
   HELPERS
===================== */
const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('id-ID') : '-'

/* =====================
   ON MOUNT
===================== */
onMounted(() => {
  reloadPO()
  getPRData()
})
</script>
