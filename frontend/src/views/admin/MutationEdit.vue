<template>
  <div class="p-6 max-w-xl">
    <h1 class="text-2xl font-bold mb-6">Edit Mutasi Stok</h1>

    <form @submit.prevent="submit" v-if="form">
      <div class="mb-4">
        <label class="block mb-1">Mobil</label>
        <select v-model="form.mobilId" class="w-full border p-2 rounded">
          <option v-for="m in stockList" :key="m.id" :value="m.id">
            {{ m.nama }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Qty</label>
        <input type="number" v-model="form.qty" class="w-full border p-2 rounded" />
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
        <router-link to="/admin/mutasi-stok" class="bg-gray-500 text-white px-4 py-2 rounded">
          Batal
        </router-link>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMutationById, updateMutation } from '@/services/mutation.service'
import { getStock } from '@/services/stock.service'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const stockList = ref([])
const form = ref(null)

const loadData = async () => {
  stockList.value = await getStock()
  form.value = await getMutationById(route.params.id)
}

const submit = async () => {
  await updateMutation(form.value.id, form.value)
  alert('Mutasi berhasil diupdate')
  router.push('/admin/mutasi-stok')
}

onMounted(loadData)
</script>
