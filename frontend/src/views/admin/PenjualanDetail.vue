<template>
  <div>

    <h1 class="text-xl font-bold mb-4">
      Detail Penjualan
    </h1>

    <!-- INFO -->
    <div v-if="penjualan">

      <p>
        Nomor:
        {{ penjualan.nomor || '-' }}
      </p>

      <p>
        Tanggal:
        {{ formatDate(penjualan.tanggal) }}
      </p>

      <p>
        Sales:
        {{ penjualan.sales?.nama || '-' }}
      </p>

      <p>
        Total:
        Rp {{ formatRupiah(penjualan.total) }}
      </p>

    </div>


    <!-- TABLE -->
    <table
      v-if="penjualan.detail?.length"
      class="table-auto border mt-4 w-full"
    >

      <thead>

        <tr>
          <th class="border px-2 py-1">Mobil</th>
          <th class="border px-2 py-1">Qty</th>
          <th class="border px-2 py-1">Harga / Unit</th>
          <th class="border px-2 py-1">Subtotal</th>
        </tr>

      </thead>


      <tbody>

        <tr
          v-for="item in penjualan.detail"
          :key="item.id"
        >

          <td class="border px-2 py-1">
            {{ item.mobil?.nama || '-' }}
          </td>

          <td class="border px-2 py-1">
            {{ item.qty }}
          </td>

          <td class="border px-2 py-1">
            Rp {{ formatRupiah(item.harga) }}
          </td>

          <td class="border px-2 py-1">
            Rp {{ formatRupiah(item.qty * item.harga) }}
          </td>

        </tr>

      </tbody>

    </table>


    <!-- EMPTY -->
    <div v-else class="mt-4 text-gray-500">
      Tidak ada detail
    </div>


  </div>
</template>



<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPenjualanById } from '@/services/penjualan.service'


const route = useRoute()


// DEFAULT VALUE AMAN
const penjualan = ref({
  nomor: '',
  tanggal: null,
  total: 0,
  sales: null,
  detail: []
})



// FORMAT RUPIAH
const formatRupiah = (angka) => {

  return (angka || 0).toLocaleString('id-ID')

}


// FORMAT DATE
const formatDate = (date) => {

  if (!date) return '-'

  return new Date(date).toLocaleDateString('id-ID')

}



// LOAD DATA
onMounted(async () => {

  try {

    const res = await getPenjualanById(route.params.id)

    penjualan.value = {
      nomor: res.nomor,
      tanggal: res.tanggal,
      total: res.total || 0,
      sales: res.sales,
      detail: res.detail || []
    }

  }
  catch (err) {

    console.error(err)

    alert('Gagal load detail penjualan')

  }

})

</script>
