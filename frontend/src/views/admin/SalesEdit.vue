<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4">Edit Sales</h2>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="form.nama" placeholder="Nama" class="w-full border p-2" required />
      <input v-model="form.noTelp" placeholder="No Telp" class="w-full border p-2" required />
      <input v-model="form.alamat" placeholder="Alamat" class="w-full border p-2" required />

      <button class="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan Perubahan
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSalesById, updateSales } from '@/services/sales.service'

const router = useRouter()
const route = useRoute()

const form = reactive({
  nama: '',
  noTelp: '',
  alamat: ''
})

// Ambil data sales berdasarkan ID
onMounted(async () => {
  const data = await getSalesById(route.params.id)
  Object.assign(form, {
    nama: data.nama,
    noTelp: data.noTelp,
    alamat: data.alamat
  })
})

const submit = async () => {
  await updateSales(route.params.id, form)
  alert('Sales berhasil diperbarui')
  router.push('/admin/sales')
}
</script>
