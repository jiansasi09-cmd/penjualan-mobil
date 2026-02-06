<template>
  <div class="p-6 max-w-xl">
    <h1 class="text-xl font-bold mb-4">Tambah Sales</h1>
    <SalesForm @submit="handleSubmit" />
  </div>
</template>

<script setup>
import SalesForm from '@/components/admin/SalesForm.vue'
import { createSales } from '@/services/sales.service'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSubmit = async (data) => {
  await createSales(data)
  router.push('/admin/sales')
}
</script>
