<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Buat Purchase Order</h1>

    <form @submit.prevent="submit">
      <label>Supplier</label>
      <select v-model="form.supplierId" class="border w-full p-2 mb-3">
        <option v-for="s in suppliers" :key="s.id" :value="s.id">
          {{ s.nama }}
        </option>
      </select>

      <h2 class="font-semibold mt-4 mb-2">Item</h2>

      <table class="w-full border">
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2">{{ item.namaBarang }}</td>
          <td class="border p-2">{{ item.qty }}</td>
          <td class="border p-2">{{ item.harga }}</td>
        </tr>
      </table>

      <button class="bg-green-600 text-white px-4 py-2 mt-4 rounded">
        Simpan PO
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
  supplierId: '',
  purchaseRequestId: route.query.pr
})

const items = ref([])
const suppliers = ref([])

onMounted(async () => {
  const pr = await axios.get(`/purchase-request/${form.value.purchaseRequestId}`)
  items.value = pr.data.items

  const sup = await axios.get('/supplier')
  suppliers.value = sup.data
})

const submit = async () => {
  await axios.post('/purchase-order', {
    ...form.value,
    items: items.value
  })

  router.push('/admin/purchase-order')
}
</script>
