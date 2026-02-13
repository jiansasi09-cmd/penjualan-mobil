<template>
  <div>

    <h1 class="text-xl font-bold mb-4">
      Tambah Pembayaran
    </h1>

    <form @submit.prevent="submit">

      <!-- INFO PENJUALAN -->
      <div class="mb-2">
        <label>Nomor Penjualan</label>
        <input
          :value="penjualan?.nomor"
          class="border p-2 w-full bg-gray-100"
          readonly
        />
      </div>

      <div class="mb-2">
        <label>Total Tagihan</label>
        <input
          :value="formatRupiah(penjualan?.total)"
          class="border p-2 w-full bg-gray-100"
          readonly
        />
      </div>

      <!-- INPUT JUMLAH BAYAR -->
      <div class="mb-2">
        <label>Jumlah Bayar</label>
        <input
          v-model="form.jumlah"
          type="number"
          class="border p-2 w-full"
          required
        />
      </div>

      <!-- METODE -->
      <div class="mb-2">
        <label>Metode</label>
        <select
          v-model="form.metode"
          class="border p-2 w-full"
        >
          <option value="CASH">CASH</option>
          <option value="TRANSFER">TRANSFER</option>
        </select>
      </div>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Simpan Pembayaran
      </button>

    </form>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createPembayaran } from '@/services/pembayaran.service'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()

const penjualan = ref(null)

const form = reactive({
  jumlah: '',
  metode: 'CASH'
})

const penjualanId = Number(route.query.penjualanId)

const formatRupiah = (value) => {
  if (!value) return "Rp 0"
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value)
}

// load data penjualan otomatis
onMounted(async () => {

  if (!penjualanId) {
    alert("Penjualan tidak valid")
    router.push('/admin/penjualan')
    return
  }

  const res = await api.get(`/penjualan/${penjualanId}`)
  penjualan.value = res.data

})

// submit pembayaran
const submit = async () => {

  await createPembayaran({
    penjualanId,
    jumlah: Number(form.jumlah),
    metode: form.metode
  })

  alert('Pembayaran berhasil')

  router.push('/admin/penjualan')
}
</script>
