<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="submit" class="bg-white p-6 rounded shadow w-80">
      <h2 class="text-xl font-bold mb-4 text-center">Login</h2>

      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full border p-2 mb-3"
        required
      />

      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        class="w-full border p-2 mb-4"
        required
      />

      <button class="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth.service'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  try {
    const data = await login(form)

    // ⛔ JANGAN simpan ulang token di sini (sudah di service)
    const role = data.user.role

    if (['ADMIN', 'SALES', 'OWNER'].includes(role)) {
      router.replace('/admin/dashboard')
    } else {
      router.replace('/customer/mobil')
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login gagal')
    console.error(err)
  }
}
</script>
