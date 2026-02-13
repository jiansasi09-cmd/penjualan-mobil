<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Sales Order</h1>

      <RouterLink
        to="/admin/sales-order/create"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tambah SO
      </RouterLink>
    </div>

    <SalesOrderTable
      :data="salesOrders"
      @refresh="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getSalesOrders } from '@/services/salesOrder.service'
import SalesOrderTable from '@/components/admin/SalesOrderTable.vue'

const salesOrders = ref([])

const fetchData = async () => {
  salesOrders.value = await getSalesOrders()
}


onMounted(fetchData)
</script>
