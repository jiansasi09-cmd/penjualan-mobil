<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Edit Penjualan</h1>

    <!-- PILIH SALES -->
    <div class="mb-4">
      <label class="block mb-1 font-semibold">Pilih Sales</label>
      <select v-model="form.salesId" class="border p-2 w-full rounded">
        <option disabled value="">Pilih Sales</option>
        <option v-for="s in salesList" :key="s.id" :value="s.id">{{ s.nama }}</option>
      </select>
    </div>

    <!-- TABEL ITEM -->
    <div v-if="form.items.length">
      <table class="w-full border mb-4">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">Mobil</th>
            <th class="p-2 border">Qty</th>
            <th class="p-2 border">Harga</th>
            <th class="p-2 border">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in form.items" :key="item.mobilId">
            <td class="p-2 border">{{ item.mobil.nama }}</td>
            <td class="p-2 border">
              <input type="number" v-model.number="item.qty" class="border p-1 w-20" />
            </td>
            <td class="p-2 border">Rp {{ formatRupiah(item.harga) }}</td>
            <td class="p-2 border">Rp {{ formatRupiah(item.qty * item.harga) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="text-right font-bold mb-4">Total: Rp {{ formatRupiah(totalOrder) }}</div>

      <button @click="update" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Update Penjualan
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const salesList = ref([])
const form = ref({ salesId: '', items: [] })

const totalOrder = computed(() => form.value.items.reduce((sum, item) => sum + item.qty * item.harga, 0))

const formatRupiah = angka => angka.toLocaleString('id-ID')

// Load sales
const loadSales = async () => {
  try { const res = await api.get('/admin/sales'); salesList.value = res.data }
  catch(err){ console.error(err) }
}

// Load penjualan by id
const loadPenjualan = async () => {
  try {
    const res = await api.get(`/penjualan/${route.params.id}`)
    form.value.salesId = res.data.salesId
    form.value.items = res.data.detail.map(d => ({
      mobilId: d.mobilId,
      mobil: d.mobil,
      qty: d.qty,
      harga: d.harga
    }))
  } catch(err){ console.error(err); alert('Gagal load penjualan') }
}

onMounted(() => { loadSales(); loadPenjualan() })

// Update penjualan
const update = async () => {
  try {
    await api.put(`/penjualan/${route.params.id}`, {
      salesId: form.value.salesId,
      detail: form.value.items.map(i => ({ mobilId: i.mobilId, qty: i.qty, harga: i.harga }))
    })
    alert('Penjualan berhasil diupdate')
    router.push('/admin/penjualan')
  } catch(err){ console.error(err); alert('Gagal update penjualan') }
}
</script>
