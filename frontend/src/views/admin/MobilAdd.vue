<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4">Tambah Mobil</h1>

    <MobilForm @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MobilForm from '@/components/admin/MobilForm.vue'
import { createMobil } from '@/services/mobil.service'

const router = useRouter()

const handleSubmit = async (data) => {
  await createMobil(data)
  router.push('/admin/mobil')
}
</script>
