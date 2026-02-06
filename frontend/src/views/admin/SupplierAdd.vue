<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Tambah Supplier</h1>

    <form @submit.prevent="submit" class="space-y-4 max-w-md">
      <BaseInput v-model="form.nama" placeholder="Nama Supplier" />
      <BaseInput v-model="form.noTelp" placeholder="No Telp" />
      <BaseInput v-model="form.alamat" placeholder="Alamat" />

      <BaseButton type="submit">Simpan</BaseButton>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createSupplier } from '@/services/supplier.service'

const router = useRouter()

const form = reactive({
  nama: '',
  noTelp: '',
  alamat: ''
})

const submit = async () => {
  await createSupplier(form)
  router.push('/admin/supplier')
}
</script>
