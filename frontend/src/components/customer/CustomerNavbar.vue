<template>
  <header class="bg-white shadow px-6 py-4 flex justify-between items-center h-16">
    <h1 class="font-semibold text-lg text-gray-800">
      Showroom Mobil
    </h1>

    <button
      @click="logout"
      class="bg-red-500 text-white px-3 py-1 rounded
             hover:bg-red-600 transition"
    >
      Logout
    </button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout as doLogout } from '@/services/auth.service'

const router = useRouter()

const logout = () => {
  doLogout()
  router.replace('/login')
}
</script>
