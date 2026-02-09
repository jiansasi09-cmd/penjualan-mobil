<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="submit"
      class="bg-white p-6 rounded-lg shadow w-96 space-y-4"
    >
      <h2 class="text-2xl font-bold text-center">Register</h2>

      <!-- Nama -->
      <div>
        <label class="text-sm text-gray-600">Nama</label>
        <input
          v-model="form.nama"
          type="text"
          placeholder="Nama lengkap"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label class="text-sm text-gray-600">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="email@example.com"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <!-- No Telp -->
      <div>
        <label class="text-sm text-gray-600">No Telp</label>
        <input
          v-model="form.noTelp"
          type="text"
          placeholder="08xxxxxxxxxx"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <!-- Alamat -->
      <div>
        <label class="text-sm text-gray-600">Alamat</label>
        <textarea
          v-model="form.alamat"
          placeholder="Alamat lengkap (opsional)"
          rows="2"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <!-- Password -->
      <div>
        <label class="text-sm text-gray-600">Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <!-- Error -->
      <p v-if="error" class="text-sm text-red-600 text-center">
        {{ error }}
      </p>

      <!-- Button -->
      <button
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Register
      </button>

      <!-- Login link -->
      <p class="text-sm text-center text-gray-600">
        Sudah punya akun?
        <RouterLink
          to="/login"
          class="text-blue-600 hover:underline font-medium"
        >
          Login
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register, login } from '@/services/auth.service'

const router = useRouter()
const error = ref('')

const form = reactive({
  nama: '',
  email: '',
  password: '',
  noTelp: '',
  alamat:''
})

const submit = async () => {
  error.value = ''
  try {
    // 1️⃣ register
    await register(form)

    // 2️⃣ auto login
    const data = await login({
      email: form.email,
      password: form.password
    })

    // 3️⃣ redirect customer
    router.replace('/customer/mobil')
  } catch (err) {
    error.value = err.response?.data?.message || 'Register gagal'
  }
}
</script>
