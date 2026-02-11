<template>
  <div class="p-6">

    <!-- 🔙 BACK BUTTON -->
    <div class="mb-4">
      <button
        @click="goBack"
        class="text-gray-600 hover:text-black flex items-center gap-2"
      >
        ← Kembali
      </button>
    </div>

    <h1 class="text-xl font-bold mb-4">
      Invoice {{ invoice?.nomor }}
    </h1>

    <p><b>PO:</b> {{ invoice?.gr?.po?.kode }}</p>
    <p><b>Tanggal:</b> {{ formatDate(invoice?.tanggal) }}</p>
    <p>
      <b>Status:</b>
      <span
        :class="{
          'text-red-600 font-semibold': invoice?.status === 'BELUM_LUNAS',
          'text-green-600 font-semibold': invoice?.status === 'LUNAS'
        }"
      >
        {{ invoice?.status }}
      </span>
    </p>

    <!-- TOMBOL LUNAS -->
    <div v-if="invoice?.status === 'BELUM_LUNAS'" class="mt-4">
      <button
        @click="markPaid"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Tandai Lunas
      </button>
    </div>

    <h2 class="mt-6 font-semibold">Item</h2>

    <table class="w-full border mt-2">
      <thead>
        <tr>
          <th class="border p-2">Mobil</th>
          <th class="border p-2">Qty</th>
          <th class="border p-2">Harga</th>
          <th class="border p-2">Subtotal</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in invoice?.items" :key="item.id">
          <td class="border p-2">{{ item.mobil.nama }}</td>
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

    <h3 class="mt-4 font-bold text-right">
      Total: Rp {{ formatRupiah(invoice?.total) }}
    </h3>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter() // ✅ tambahkan ini
const invoice = ref(null)

const loadInvoice = async () => {
  const { data } = await api.get(`/purchase-invoice/${route.params.id}`)
  invoice.value = data
}

const markPaid = async () => {
  if (!confirm('Tandai invoice ini sebagai LUNAS?')) return

  try {
    await api.patch(`/purchase-invoice/${invoice.value.id}/paid`)
    
    alert('Invoice berhasil dilunasi')

    // ✅ Redirect ke halaman utama Purchase Invoice
    router.push('/admin/purchase-invoice')

  } catch (err) {
    alert('Gagal update status')
  }
}

const formatDate = (d) =>
  new Date(d).toLocaleDateString('id-ID')

const formatRupiah = (v) =>
  Number(v || 0).toLocaleString('id-ID')

onMounted(loadInvoice)

const goBack = () => {
  router.push('/admin/purchase-invoice')
}
</script>
