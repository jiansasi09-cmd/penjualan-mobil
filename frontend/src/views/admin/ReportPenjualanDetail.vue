<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Detail Penjualan - {{ penjualan.nomor || '-' }}</h1>

    <div class="mb-4">
      <p><strong>Tanggal:</strong> {{ formatTanggal(penjualan.tanggal) }}</p>
      <p><strong>Sales:</strong> {{ penjualan.sales?.nama || '-' }}</p>
      <p><strong>Status:</strong> <span :class="getStatusClass(penjualan.status)" class="px-2 py-1 rounded text-xs font-semibold">{{ penjualan.status }}</span></p>
      <p><strong>Total:</strong> {{ formatRupiah(penjualan.total) }}</p>
    </div>

    <h2 class="text-lg font-semibold mb-2">Detail Item</h2>
    <table class="w-full border border-gray-300 rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1 text-left">Mobil</th>
          <th class="border px-2 py-1 text-left">Qty</th>
          <th class="border px-2 py-1 text-left">Harga</th>
          <th class="border px-2 py-1 text-left">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in penjualan.detail" :key="item.id">
          <td class="border px-2 py-1">{{ item.mobil.nama }} - {{ item.mobil.merk }} {{ item.mobil.tipe }}</td>
          <td class="border px-2 py-1">{{ item.qty }}</td>
          <td class="border px-2 py-1">{{ formatRupiah(item.harga) }}</td>
          <td class="border px-2 py-1">{{ formatRupiah(item.subtotal) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="border px-2 py-1 text-right font-bold">Total</td>
          <td class="border px-2 py-1 font-bold">{{ formatRupiah(penjualan.total) }}</td>
        </tr>
      </tfoot>
    </table>

    <button @click="$router.back()" class="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Kembali</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getReportPenjualanDetail } from '@/services/reportPenjualan.service'

const props = defineProps({
  id: { type: [String, Number], required: true }
})

const penjualan = ref({ detail: [] })

const formatRupiah = (value) => {
  if (!value) return "Rp 0"
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value)
}

const formatTanggal = (tanggal) => {
  return tanggal ? new Date(tanggal).toLocaleDateString('id-ID') : '-'
}

const getStatusClass = (status) => {
  if (status === "PAID") return "bg-green-100 text-green-700"
  if (status === "PARTIAL") return "bg-yellow-100 text-yellow-700"
  if (status === "UNPAID") return "bg-red-100 text-red-700"
  return "bg-gray-100 text-gray-700"
}

onMounted(async () => {
  try {
    penjualan.value = await getReportPenjualanDetail(props.id)
  } catch (err) {
    console.error('Gagal load detail penjualan:', err)
  }
})
</script>
