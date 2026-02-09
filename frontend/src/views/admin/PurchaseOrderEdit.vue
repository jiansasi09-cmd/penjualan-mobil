<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Edit Purchase Order</h1>

    <form @submit.prevent="submit">
      <label>Status</label>
      <select v-model="form.status" class="border w-full p-2 mb-3">
        <option>DRAFT</option>
        <option>DIKIRIM</option>
        <option>DITERIMA</option>
      </select>

      <button class="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/services/api'

const route = useRoute()
const router = useRouter()

const form = ref({
  status: ''
})

onMounted(async () => {
  const res = await axios.get(`/purchase-order/${route.params.id}`)
  form.value.status = res.data.status
})

const submit = async () => {
  await axios.put(`/purchase-order/${route.params.id}`, form.value)
  router.push('/admin/purchase-order')
}
</script>
