<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Detail Customer</h1>

    <div v-if="customer" class="bg-white p-6 rounded shadow max-w-lg">
      <div class="mb-3">
        <label class="font-semibold">Nama</label>
        <p>{{ customer.nama }}</p>
      </div>

      <div class="mb-3">
        <label class="font-semibold">Email</label>
        <p>{{ customer.email }}</p>
      </div>

      <div class="mb-3">
        <label class="font-semibold">No Telp</label>
        <p>{{ customer.noTelp }}</p>
      </div>

      <div class="mb-3">
        <label class="font-semibold">Alamat</label>
        <p>{{ customer.alamat || '-' }}</p>
      </div>

      <div class="mb-3">
        <label class="font-semibold">Terdaftar Sejak</label>
        <p>{{ formatDate(customer.createdAt) }}</p>
      </div>

      <RouterLink
        to="/admin/customer"
        class="inline-block mt-4 text-blue-600 hover:underline"
      >
        ← Kembali
      </RouterLink>
    </div>

    <div v-else class="text-gray-500">
      Memuat data customer...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCustomerById } from '@/services/customer.service'

const route = useRoute()
const customer = ref(null)

onMounted(async () => {
  customer.value = await getCustomerById(route.params.id)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
</script>
