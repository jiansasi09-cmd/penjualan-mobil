<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-xl font-bold mb-4">Edit Profil</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="form.nama" class="w-full border p-2" placeholder="Nama" />
      <input v-model="form.email" disabled class="w-full border p-2 bg-gray-100" />
      <input v-model="form.noTelp" class="w-full border p-2" placeholder="No Telp" />
      <textarea v-model="form.alamat" class="w-full border p-2" placeholder="Alamat" />

      <button class="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCustomerById, updateMyProfile } from '@/services/customer.service'

const route = useRoute()
const router = useRouter()

const form = reactive({
  nama: '',
  email: '',
  noTelp: '',
  alamat: ''
})

onMounted(async () => {
  const data = await getCustomerById(route.params.id)
  Object.assign(form, data)
})

const submit = async () => {
  await updateMyProfile(route.params.id, form)
  alert('Profil berhasil diperbarui')
  router.push('/customer/profile')
}
</script>
