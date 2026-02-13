<template>
  <div class="p-6 max-w-xl">
    <h1 class="text-2xl font-bold mb-6">Detail Mutasi Stok</h1>

    <div v-if="data" class="space-y-3 bg-white p-6 rounded shadow">
      <p><strong>Mobil:</strong> {{ data.mobil?.nama }}</p>
      <p><strong>Qty:</strong> {{ data.qty }}</p>
      <p><strong>Tipe:</strong> {{ data.type }}</p>
      <p><strong>Reference:</strong> {{ data.reference }}</p>
      <p><strong>Tanggal:</strong> {{ formatDate(data.createdAt) }}</p>
    </div>

    <router-link
      to="/admin/mutasi-stok"
      class="inline-block mt-6 bg-gray-600 text-white px-4 py-2 rounded"
    >
      Kembali
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMutationById } from '@/services/mutation.service'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = ref(null)

const loadData = async () => {
  data.value = await getMutationById(route.params.id)
}

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}


onMounted(loadData)
</script>
