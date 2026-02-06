<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="submit"
      class="bg-white p-6 rounded shadow w-96 space-y-4"
    >
      <h2 class="text-lg font-bold text-center">Register Customer</h2>

      <BaseInput v-model="form.nama" placeholder="Nama" />
      <BaseInput v-model="form.email" placeholder="Email" />
      <BaseInput v-model="form.password" type="password" placeholder="Password" />
      <BaseInput v-model="form.noTelp" placeholder="No Telp" />
      <BaseInput v-model="form.alamat" placeholder="Alamat" />

      <BaseButton type="submit" class="w-full">
        Daftar
      </BaseButton>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { registerCustomer } from '@/services/customerAuth.service'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()

const form = reactive({
  nama: '',
  email: '',
  password: '',
  noTelp: '',
  alamat: ''
})

const submit = async () => {
  await registerCustomer(form)
  router.push('/customer/login')
}
</script>
