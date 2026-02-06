<template>
  <div class="p-6 max-w-xl">
    <h1 class="text-xl font-bold mb-4">Edit Sales</h1>
    <SalesForm
      :modelValue="sales"
      isEdit
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SalesForm from '@/components/admin/SalesForm.vue'
import { getSalesById, updateSales } from '@/services/sales.service'

const route = useRoute()
const router = useRouter()
const sales = ref(null)

onMounted(async () => {
  sales.value = await getSalesById(route.params.id)
})

const handleSubmit = async (data) => {
  await updateSales(route.params.id, data)
  router.push('/admin/sales')
}
</script>
