<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Tambah Penjualan</h1>

    <!-- PILIH SALES ORDER -->
    <div class="mb-4">
      <label class="block mb-1 font-semibold">Pilih Sales Order</label>
      <select v-model="selectedSOId" @change="loadSOItems" class="border p-2 w-full rounded">
        <option disabled value="">Pilih SO yang sudah APPROVED</option>
        <option v-for="so in approvedSO" :key="so.id" :value="so.id">
          {{ so.nomor }} - {{ formatDate(so.tanggal) }}
        </option>
      </select>
    </div>

    <!-- PILIH SALES -->
    <div class="mb-4">
      <label class="block mb-1 font-semibold">Pilih Sales</label>
      <select v-model="form.salesId" class="border p-2 w-full rounded">
        <option disabled value="">Pilih Sales</option>
        <option v-for="s in salesList" :key="s.id" :value="s.id">
          {{ s.nama }}
        </option>
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
            <td class="p-2 border">{{ item.qty }}</td>
            <td class="p-2 border">Rp {{ formatRupiah(item.harga) }}</td>
            <td class="p-2 border">Rp {{ formatRupiah(item.qty * item.harga) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- TOTAL -->
      <div class="text-right font-bold mb-4">Total: Rp {{ formatRupiah(totalOrder) }}</div>

      <!-- BUTTON -->
      <button @click="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Submit Penjualan
      </button>
    </div>

    <!-- EMPTY -->
    <div v-else class="text-gray-500">Belum ada item</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { createPenjualan } from '@/services/penjualan.service'

const router = useRouter()

const approvedSO = ref([])
const salesList = ref([])
const selectedSOId = ref('')
const form = ref({
  salesOrderId: null,
  salesId: '',
  userId: 1,
  items: []
})

// Load SO dan sales
const loadSO = async () => {
  try {
    const res = await api.get('/admin/sales-order?status=APPROVED')
    approvedSO.value = res.data
  } catch (err) { console.error(err); alert('Gagal load Sales Order') }
}

const loadSales = async () => {
  try {
    const res = await api.get('/admin/sales')
    salesList.value = res.data
  } catch (err) { console.error(err); alert('Gagal load Sales') }
}

onMounted(() => { loadSO(); loadSales() })

// Load item SO
const loadSOItems = () => {
  const so = approvedSO.value.find(s => s.id === selectedSOId.value)
  if (!so) return

  form.value.salesOrderId = so.id
  form.value.salesId = so.salesId
  form.value.items = so.detail.map(d => ({
    mobilId: d.mobilId,
    mobil: d.mobil,
    qty: d.qty,
    harga: d.harga
  }))
}

// Total penjualan
const totalOrder = computed(() => form.value.items.reduce((sum, item) => sum + item.qty * item.harga, 0))

// Format
const formatRupiah = angka => angka.toLocaleString('id-ID')
const formatDate = date => new Date(date).toLocaleDateString('id-ID')

// Submit
const submit = async () => {
  if (!form.value.salesOrderId) return alert('Pilih Sales Order dulu')
  if (!form.value.salesId) return alert('Pilih Sales dulu')

  try {
    await createPenjualan({
      salesOrderId: form.value.salesOrderId,
      salesId: form.value.salesId,
      userId: form.value.userId,
      detail: form.value.items.map(item => ({
        mobilId: item.mobilId, qty: item.qty, harga: item.harga
      }))
    })
    alert('Penjualan berhasil dibuat')
    router.push('/admin/penjualan')
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || 'Gagal membuat penjualan')
  }
}
</script>
