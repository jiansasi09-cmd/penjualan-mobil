<template>
  <div class="p-6" v-if="data">
    <h1 class="text-xl font-bold mb-4">
      Detail Sales Order - {{ data.nomor }}
    </h1>

    <p><b>Customer:</b> {{ data.customer.nama }}</p>
    <p><b>Status:</b> {{ data.status }}</p>

    <table class="w-full mt-4 border">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">Mobil</th>
          <th class="p-2">Qty</th>
          <th class="p-2">Harga</th>
          <th class="p-2">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in data.detail" :key="d.id" class="border-t">
          <td class="p-2">{{ d.mobil.nama }}</td>
          <td class="p-2">{{ d.qty }}</td>
          <td class="p-2">{{ d.harga }}</td>
          <td class="p-2">{{ d.subtotal }}</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 font-bold">
      Total: Rp {{ data.total.toLocaleString() }}
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSalesOrderById } from '@/services/salesOrder.service'

const route = useRoute()
const data = ref(null)

onMounted(async () => {
  const res = await getSalesOrderById(route.params.id)
  data.value = res
})
</script>
