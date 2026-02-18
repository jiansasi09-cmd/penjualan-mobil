<template>

  <div class="p-6">

    <h1 class="text-xl font-bold mb-4">
      Detail Invoice
    </h1>

    <div v-if="data">

      <p><b>Nomor:</b> {{ data.nomor }}</p>

      <p><b>Tanggal:</b> {{ formatDate(data.tanggal) }}</p>

      <p><b>Supplier:</b> {{ data.gr?.po?.supplier?.nama }}</p>

      <p><b>Status:</b> {{ data.status }}</p>

      <p><b>Total:</b> {{ formatRupiah(data.total) }}</p>

      <h2 class="mt-4 font-bold">
        Detail Barang
      </h2>

      <table class="w-full border mt-2">

        <tr class="bg-gray-100">
          <th class="p-2">Mobil</th>
          <th class="p-2">Qty</th>
          <th class="p-2">Harga</th>
          <th class="p-2">Subtotal</th>
        </tr>

        <tr
          v-for="item in data.items"
          :key="item.id"
        >
          <td class="p-2">{{ item.mobil.nama }}</td>
          <td class="p-2">{{ item.qty }}</td>
          <td class="p-2">{{ formatRupiah(item.harga) }}</td>
          <td class="p-2">{{ formatRupiah(item.subtotal) }}</td>
        </tr>

      </table>

    </div>

  </div>

</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getReportPembelianDetail } from '@/services/reportPembelian.service'

const route = useRoute()

const data = ref(null)


onMounted(async () => {

  data.value = await getReportPembelianDetail(route.params.id)

})


const formatDate = (d) => {

  return new Date(d).toLocaleDateString('id-ID')

}


const formatRupiah = (value) => {

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)

}

</script>
