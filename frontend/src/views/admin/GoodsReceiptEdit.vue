<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Edit Penerimaan</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-gray-600">
      Memuat data...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-600">
      {{ error }}
    </div>

    <!-- Form -->
    <div v-else>
      <table class="w-full border">
        <thead>
          <tr>
            <th class="border p-2">Mobil</th>
            <th class="border p-2">Qty</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="border p-2">{{ item.mobil?.nama || '-' }}</td>
            <td class="border p-2">
              <input
                type="number"
                v-model.number="item.qty"
                min="0"
                class="border p-1 w-20"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button
        @click="submit"
        class="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="submitting"
      >
        {{ submitting ? 'Menyimpan...' : 'Update' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getGoodsReceiptById,
  updateGoodsReceipt
} from '@/services/goodsReceipt.service'

const route = useRoute()
const router = useRouter()

const items = ref([])
const loading = ref(true)
const submitting = ref(false)
const error = ref(null)

const load = async () => {
  loading.value = true
  error.value = null

  try {
    const data = await getGoodsReceiptById(route.params.id)

    items.value = data.items.map(i => ({
      ...i,
      qty: i.qtyTerima
    }))
  } catch (err) {
    if (err.response?.status === 404) {
      alert('Penerimaan barang tidak ditemukan')
      router.replace('/admin/goods-receipt')
    } else {
      alert('Terjadi kesalahan saat memuat data')
    }
  } finally {
    loading.value = false
  }
}



const submit = async () => {
  submitting.value = true
  try {
    await updateGoodsReceipt(route.params.id, {
      items: items.value
    })
    alert('Penerimaan berhasil diupdate')
    router.push('/admin/goods-receipt')
  } catch (err) {
    alert(err.response?.data?.message || 'Gagal update penerimaan')
  } finally {
    submitting.value = false
  }
}

onMounted(load)
</script>
