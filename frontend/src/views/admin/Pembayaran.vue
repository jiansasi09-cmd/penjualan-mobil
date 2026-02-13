<template>
  <div>

    <h1 class="text-xl font-bold mb-4">Pembayaran</h1>

    <PembayaranTable
      :data="pembayaran"
      @delete="handleDelete"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getPembayaran,
  deletePembayaran
} from '@/services/pembayaran.service'

import PembayaranTable from '@/components/admin/PembayaranTable.vue'

const pembayaran = ref([])

const loadData = async () => {
  pembayaran.value = await getPembayaran()
}

onMounted(loadData)

const handleDelete = async (id) => {

  if (!confirm('Yakin hapus pembayaran?')) return

  await deletePembayaran(id)

  alert('Pembayaran berhasil dihapus')

  loadData()
}
</script>
