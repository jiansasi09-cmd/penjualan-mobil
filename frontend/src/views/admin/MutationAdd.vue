<template>
  <div class="p-6 max-w-xl">
    <h1 class="text-2xl font-bold mb-6">Tambah Mutasi Stok</h1>

    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="block mb-1">Mobil</label>
        <select v-model="form.mobilId" class="w-full border p-2 rounded" required>
          <option v-for="m in stockList" :key="m.id" :value="m.id">
            {{ m.nama }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Qty</label>
        <input type="number" v-model="form.qty" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block mb-1">Tipe</label>
        <select v-model="form.type" class="w-full border p-2 rounded">
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
          <option value="ADJUSTMENT">ADJUSTMENT</option>
        </select>
      </div>

      <div class="mb-6">
        <label class="block mb-1">Reference</label>
        <input type="text" v-model="form.reference" class="w-full border p-2 rounded" />
      </div>

      <div class="flex gap-3">
        <router-link to="/admin/mutation" class="bg-gray-500 text-white px-4 py-2 rounded">
          Batal
        </router-link>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createMutation } from '@/services/mutation.service'
import { getStock } from '@/services/stock.service'
import { useRouter } from 'vue-router'

const router = useRouter()

const stockList = ref([])

const form = ref({
  mobilId: null,
  qty: 0,
  type: 'IN',
  reference: ''
})

const loadStock = async () => {
  stockList.value = await getStock()
  if (stockList.value.length > 0) {
    form.value.mobilId = stockList.value[0].id
  }
}

const submit = async () => {
  await createMutation(form.value)
  alert('Mutasi berhasil ditambahkan')
  router.push('/admin/mutasi-stok')
}

onMounted(loadStock)
</script>
