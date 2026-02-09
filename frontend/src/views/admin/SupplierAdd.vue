<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4">Tambah Supplier</h1>

    <SupplierForm @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SupplierForm from '@/components/admin/SupplierForm.vue'
import { createSupplier } from '@/services/supplier.service'

const router = useRouter()

const handleSubmit = async (data) => {
  await createSupplier(data)
  router.push('/admin/supplier')
}
</script>
