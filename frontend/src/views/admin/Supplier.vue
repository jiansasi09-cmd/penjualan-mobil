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

    <BaseTable
      :headers="['Nama', 'No Telp', 'Alamat', 'Aksi']"
      :keys="['nama', 'noTelp', 'alamat']"
      :data="supplier"
    >
      <template #aksi="{ item }">
        <RouterLink
          :to="`/admin/supplier/edit/${item.id}`"
          class="text-blue-600 mr-2"
        >
          Edit
        </RouterLink>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import { getSupplier } from '@/services/supplier.service'

const supplier = ref([])

onMounted(async () => {
  supplier.value = await getSupplier()
})
</script>
