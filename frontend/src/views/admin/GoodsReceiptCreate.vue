<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Penerimaan Barang</h1>

    <!-- Loading -->
    <div v-if="loading" class="mb-4">Memuat data...</div>

    <!-- Tabel Barang -->
    <table v-if="items.length > 0" class="w-full border-collapse border">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">Mobil</th>
          <th class="border p-2">Qty</th>
          <th class="border p-2">Qty Diterima</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2">{{ item.mobil?.nama }}</td>
          <td class="border p-2">{{ item.qty }}</td>
          <td class="border p-2">
            <input
              type="number"
              v-model.number="item.qtyReceived"
              class="border p-1 w-20 text-center"
              min="0"
              :max="item.qty"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tombol Submit -->
    <button
      @click="submit"
      :disabled="submitting || items.length === 0"
      class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
    >
      {{ submitting ? 'Menyimpan...' : 'Submit Penerimaan' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { createGoodsReceiptFromPO } from '@/services/goodsReceipt.service'
import { updatePOStatus } from '@/services/purchaseOrder.service'

const route = useRoute()
const router = useRouter()

const poId = Number(route.query.poId)
const items = ref([])
const loading = ref(false)
const submitting = ref(false)

/* =========================
   Load PO Detail
========================= */
const loadPO = async () => {
  if (!poId || isNaN(poId)) {
    alert('PO ID tidak valid')
    router.push('/admin/purchase-order')
    return
  }

  loading.value = true
  try {
    const res = await api.get(`/purchase-order/admin/${poId}`)

    if (!res.data.items || res.data.items.length === 0) {
      alert('PO tidak memiliki item')
      router.push('/admin/purchase-order')
      return
    }

    items.value = res.data.items.map(i => ({
      id: i.id,
      mobilId: i.mobilId,
      mobil: i.mobil,
      qty: i.qty,
      qtyReceived: i.qty
    }))
  } catch (err) {
    console.error(err)
    alert('Gagal mengambil data PO')
    router.push('/admin/purchase-order')
  } finally {
    loading.value = false
  }
}

/* =========================
   Submit Goods Receipt
========================= */
const submit = async () => {
  const invalid = items.value.some(i => i.qtyReceived < 0 || i.qtyReceived > i.qty)
  if (invalid) {
    alert('Qty diterima tidak valid')
    return
  }

  submitting.value = true
  try {
    await createGoodsReceiptFromPO(
      poId,
      items.value.map(i => ({
        mobilId: i.mobilId,
        qtyTerima: i.qtyReceived
      }))
    )

    await updatePOStatus(poId, 'DITERIMA')

    alert('Penerimaan barang berhasil dibuat')
    router.push('/admin/goods-receipt')
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || 'Gagal simpan penerimaan')
  } finally {
    submitting.value = false
  }
}

onMounted(loadPO)
</script>
