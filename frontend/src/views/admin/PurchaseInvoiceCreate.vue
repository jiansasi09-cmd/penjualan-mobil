<template>
  <div class="p-6 max-w-4xl mx-auto">

    <h1 class="text-2xl font-bold mb-6">Buat Purchase Invoice</h1>

    <!-- Info GR -->
    <div v-if="gr" class="mb-6 bg-gray-50 p-4 rounded">
      <p><b>Kode GR:</b> {{ gr.kode }}</p>
      <p><b>Supplier:</b> {{ gr.po?.supplier?.nama }}</p>
      <p><b>Tanggal:</b> {{ formatDate(gr.createdAt) }}</p>
    </div>

    <!-- Items -->
    <table class="w-full border mb-6">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">Mobil</th>
          <th class="border p-2">Qty</th>
          <th class="border p-2">Harga</th>
          <th class="border p-2">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.mobilId">
          <td class="border p-2">{{ item.nama }}</td>
          <td class="border p-2 text-center">{{ item.qty }}</td>
          <td class="border p-2 text-right">
            Rp {{ formatRupiah(item.harga) }}
          </td>
          <td class="border p-2 text-right">
            Rp {{ formatRupiah(item.subtotal) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Total -->
    <div class="text-right text-xl font-bold mb-6">
      Total: Rp {{ formatRupiah(total) }}
    </div>

    <!-- Button -->
    <div class="flex gap-4">
      <button
        @click="submit"
        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Simpan
      </button>

      <router-link
        to="/admin/purchase-invoice"
        class="bg-gray-400 text-white px-6 py-2 rounded"
      >
        Batal
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api' // axios instance

const route = useRoute()
const router = useRouter()

const gr = ref(null)
const items = ref([])

const loadGR = async () => {
  const { data } = await api.get(`/goods-receipt/admin/${route.params.grId}`)
  gr.value = data

  items.value = data.items.map(i => {
    const poItem = data.po.items.find(p => p.mobilId === i.mobilId)
    const harga = poItem?.harga || 0
    const subtotal = harga * i.qtyTerima

    return {
      mobilId: i.mobilId,
      nama: i.mobil.nama,
      qty: i.qtyTerima,
      harga,
      subtotal
    }
  })
}

const total = computed(() =>
  items.value.reduce((sum, i) => sum + i.subtotal, 0)
)

const formatDate = d =>
  new Date(d).toLocaleDateString('id-ID')

const formatRupiah = v =>
  Number(v).toLocaleString('id-ID')

const submit = async () => {
  try {
    await api.post('/purchase-invoice', {
      grId: gr.value.id,
      nomor: `PI-${Date.now()}`
    })

    alert('Invoice berhasil dibuat')
    router.push('/admin/purchase-invoice')
  } catch (err) {
    alert('Gagal membuat invoice')
  }
}

onMounted(loadGR)
</script>
