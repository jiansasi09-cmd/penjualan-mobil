<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Pembelian</h1>
    <PembelianTable :data="pembelian" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPembelian } from '@/services/pembelian.service'
import PembelianTable from '@/components/admin/PembelianTable.vue'

const pembelian = ref([])

onMounted(async () => {
  try {
    pembelian.value = await getPembelian()
  } catch (err) {
    console.error('Gagal load pembelian:', err)
  }
})
</script>
