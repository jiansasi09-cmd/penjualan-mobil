<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Profil Saya</h1>

    <!-- Tabel profil -->
    <CustomerProfileTable
      :data="[profile]"
      @edit="editProfile"
    />

    <!-- Modal edit -->
    <div v-if="editing" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form @submit.prevent="submitEdit" class="bg-white p-6 rounded shadow w-96 space-y-4">
        <h2 class="text-xl font-bold">Edit Profil</h2>

        <input v-model="form.nama" placeholder="Nama" class="w-full border p-2" />
        <input v-model="form.email" placeholder="Email" disabled class="w-full border p-2 bg-gray-100" />
        <input v-model="form.noTelp" placeholder="No Telp" class="w-full border p-2" />
        <textarea v-model="form.alamat" placeholder="Alamat" class="w-full border p-2"></textarea>

        <div class="flex justify-end gap-2">
          <button type="button" @click="editing=false" class="px-4 py-2 border rounded">Batal</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import CustomerProfileTable from '@/components/customer/CustomerTable.vue'
import { getMyProfile, updateMyProfile } from '@/services/customer.service'

const profile = reactive({
  id: '',
  nama: '',
  email: '',
  noTelp: '',
  alamat: ''
})

const form = reactive({ ...profile })
const editing = ref(false)

onMounted(async () => {
  const data = await getMyProfile()
  Object.assign(profile, data)
})

const editProfile = (row) => {
  Object.assign(form, row)
  editing.value = true
}

const submitEdit = async () => {
  await updateMyProfile({
    nama: form.nama,
    noTelp: form.noTelp,
    alamat: form.alamat
  })
  Object.assign(profile, form)
  editing.value = false
  alert('Profil berhasil diperbarui')
}
</script>
