<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4">Tambah Purchase Request</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block mb-1">Supplier</label>
        <select v-model="form.supplierId" class="w-full border p-2 rounded" required>
          <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.nama }}</option>
        </select>
      </div>

      <div>
        <h2 class="font-semibold mb-2">Item PR</h2>
        <div v-for="(item, index) in form.items" :key="index" class="flex gap-2 mb-2">
          <select v-model="item.mobilId" class="flex-1 border p-2 rounded" required>
            <option v-for="m in mobils" :key="m.id" :value="m.id">{{ m.nama }}</option>
          </select>
          <input type="number" v-model="item.qty" min="1" placeholder="Qty" class="w-20 border p-2 rounded" required />
          <button type="button" @click="removeItem(index)" class="text-red-600">×</button>
        </div>
        <button type="button" @click="addItem" class="px-3 py-1 bg-gray-200 rounded">+ Tambah Item</button>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getSupplier } from '@/services/supplier.service'
import { getMobil } from '@/services/mobil.service'
import { createPR } from '@/services/purchaseRequest.service'
import { useRouter } from 'vue-router'

const router = useRouter()

const suppliers = ref([])
const mobils = ref([])

const form = reactive({
  supplierId: null,
  items: [{ mobilId: null, qty: 1 }]
})

const addItem = () => form.items.push({ mobilId: null, qty: 1 })
const removeItem = (i) => form.items.splice(i, 1)

const submit = async () => {
  await createPR(form)
  router.push('/admin/purchase-request')
}

onMounted(async () => {
  suppliers.value = await getSupplier()
  mobils.value = await getMobil()
})
</script>
