<template>

<div class="p-6">

  <h1 class="text-xl font-bold mb-4">

    Detail Stok - {{ mobil.nama }}

  </h1>


  <p>Merk : {{ mobil.merk }}</p>

  <p>Tipe : {{ mobil.tipe }}</p>

  <p>Stok : {{ mobil.stok }}</p>


  <h2 class="mt-4 font-bold">Mutasi Stok</h2>


  <table class="w-full border mt-2">

    <thead>

      <tr>

        <th class="border px-2 py-1">Tanggal</th>

        <th class="border px-2 py-1">Tipe</th>

        <th class="border px-2 py-1">Qty</th>

        <th class="border px-2 py-1">Referensi</th>

      </tr>

    </thead>


    <tbody>

      <tr v-for="m in mobil.stockMutations" :key="m.id">

        <td class="border px-2 py-1">
          {{ new Date(m.createdAt).toLocaleDateString('id-ID') }}
        </td>

        <td class="border px-2 py-1">
          {{ m.type }}
        </td>

        <td class="border px-2 py-1">
          {{ m.qty }}
        </td>

        <td class="border px-2 py-1">
          {{ m.reference }}
        </td>

      </tr>

    </tbody>

  </table>


</div>

</template>


<script setup>

import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import { getReportStokDetail } from '@/services/reportStok.service'


const route = useRoute()

const mobil = ref({

  stockMutations: []

})


onMounted(async () => {

  mobil.value = await getReportStokDetail(route.params.id)

})

</script>
