<template>
  <div>
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Data Customer</h1>
      <!-- TIDAK ADA TAMBAH -->
    </div>

    <!-- Panggil komponen tabel -->
    <CustomerTable :data="customers" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CustomerTable from '@/components/admin/CustomerTable.vue'
import { getCustomers } from '@/services/customer.service'

const customers = ref([])

onMounted(async () => {
  customers.value = await getCustomers()
})
</script>
