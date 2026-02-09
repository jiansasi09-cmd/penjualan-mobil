<template>
  <div>
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Data Supplier</h1>
      <RouterLink
        to="/admin/supplier/add"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Tambah
      </RouterLink>
    </div>

    <!-- Panggil komponen tabel -->
    <SupplierTable :data="supplier" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SupplierTable from '@/components/admin/SupplierTable.vue'
import { getSupplier } from '@/services/supplier.service'

const supplier = ref([])

onMounted(async () => {
  supplier.value = await getSupplier()
})
</script>
