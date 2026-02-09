<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4">Tambah Sales</h2>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="form.nama" placeholder="Nama" class="w-full border p-2" required />
      <input v-model="form.noTelp" placeholder="No Telp" class="w-full border p-2" required />
      <input v-model="form.alamat" placeholder="Alamat" class="w-full border p-2" required />

      <button class="bg-blue-600 text-white px-4 py-2 rounded">
        Tambah
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { addSales } from '@/services/sales.service'

const router = useRouter()

const form = reactive({
  nama: '',
  noTelp: '',
  alamat: ''
})

const submit = async () => {
  await addSales(form)
  router.push('/admin/sales') // kembali ke tabel setelah tambah
}
</script>
