<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Data Sales</h1>
      <router-link
        to="/admin/sales/add"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tambah Sales
      </router-link>
    </div>

    <SalesTable :data="sales" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSales } from '@/services/sales.service'
import SalesTable from '@/components/admin/SalesTable.vue'

const sales = ref([])

onMounted(async () => {
  sales.value = await getSales()
})
</script>
