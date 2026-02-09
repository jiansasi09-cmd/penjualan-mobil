<template>
  <BaseTable
    :headers="['Nama', 'No Telp', 'Alamat']"
    :keys="['nama', 'noTelp', 'alamat']"
    :data="data"
  >
    <template #action="{ row }">
      <router-link
        :to="`/admin/sales/edit/${row.id}`"
        class="text-blue-600 hover:underline mr-3"
      >
        Edit
      </router-link>
      <button @click="hapus(row.id)" class="text-red-600 hover:underline">
        Hapus
      </button>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'
import { deleteSales } from '@/services/sales.service'
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const hapus = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus sales ini?')) return
  await deleteSales(id)
  alert('Sales berhasil dihapus')
  // reload page atau emit event ke parent
  window.location.reload() // sederhana, bisa diganti emit jika mau lebih rapi
}
</script>
