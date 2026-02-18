<template>

  <table class="w-full border">

    <thead class="bg-gray-100">

      <tr>

        <th class="p-2 text-left">Nomor</th>
        <th class="p-2 text-left">Tanggal</th>
        <th class="p-2 text-left">Supplier</th>
        <th class="p-2 text-left">Total</th>
        <th class="p-2 text-left">Status</th>
        <th class="p-2 text-left">Action</th>

      </tr>

    </thead>

    <tbody>

      <tr
        v-for="row in formattedData"
        :key="row.id"
        class="border-t"
      >

        <td class="p-2">{{ row.nomor }}</td>

        <td class="p-2">{{ row.tanggal }}</td>

        <td class="p-2">{{ row.supplier }}</td>

        <td class="p-2">{{ row.total }}</td>

        <td class="p-2">

          <span :class="getStatusClass(row.status)"
            class="px-2 py-1 rounded text-xs">

            {{ row.status }}

          </span>

        </td>

        <td class="p-2">

          <RouterLink
            :to="`/admin/report/pembelian/${row.id}`"
            class="bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Detail
          </RouterLink>

        </td>

      </tr>

    </tbody>

  </table>

</template>

<script setup>

import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  data: Array
})


const formatRupiah = (value) => {

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)

}


const formattedData = computed(() => {

  return props.data.map(d => ({

    id: d.id,

    nomor: d.nomor,

    tanggal: new Date(d.tanggal).toLocaleDateString('id-ID'),

    supplier: d.gr?.po?.supplier?.nama || '-',

    total: formatRupiah(d.total),

    status: d.status

  }))

})


const getStatusClass = (status) => {

  if (status === "LUNAS")
    return "bg-green-100 text-green-700"

  if (status === "BELUM_LUNAS")
    return "bg-red-100 text-red-700"

  return "bg-gray-100 text-gray-700"

}

</script>
