<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Edit Sales Order</h1>

    <SalesOrderForm :editData="data" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSalesOrderById } from '@/services/salesOrder.service'
import SalesOrderForm from '@/components/admin/SalesOrderForm.vue'

const route = useRoute()
const data = ref(null)

onMounted(async () => {
  data.value = await getSalesOrderById(route.params.id)
})
</script>
