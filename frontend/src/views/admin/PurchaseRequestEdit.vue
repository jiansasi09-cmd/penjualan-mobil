<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4">Edit Purchase Request</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block mb-1">Supplier</label>
        <select v-model="form.supplierId" class="w-full border p-2 rounded" required>
          <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.nama }}</option>
        </select>
      </div>

      <div>
        <label class="block mb-1">Status</label>
        <select v-model="form.status" class="w-full border p-2 rounded" required>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getPRById, updatePR } from '@/services/purchaseRequest.service'
import { getSupplier } from '@/services/supplier.service'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const suppliers = ref([])
const form = reactive({
  supplierId: null,
  status: 'PENDING'
})

onMounted(async () => {
  suppliers.value = await getSupplier()
  const data = await getPRById(route.params.id)
  form.supplierId = data.supplierId
  form.status = data.status
})

const submit = async () => {
  await updatePR(route.params.id, form)
  router.push('/admin/purchase-request')
}
</script>
