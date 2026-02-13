<template>
  <div>

    <h1 class="text-xl font-bold mb-4">
      Detail Pembayaran
    </h1>

    <div v-if="data">

      <p>Penjualan: {{ data.penjualan?.nomor }}</p>
      <p>Jumlah: {{ data.jumlah }}</p>
      <p>Metode: {{ data.metode }}</p>
      <p>Tanggal: {{ formatTanggal(data.tanggal) }}</p>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPembayaranById } from '@/services/pembayaran.service'

const route = useRoute()

const data = ref(null)

onMounted(async () => {

  data.value = await getPembayaranById(route.params.id)

})

const formatTanggal = (tgl) =>
  new Date(tgl).toLocaleDateString()
</script>
