<template>
  <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
    <h1 class="font-semibold text-lg">Sistem Penjualan Mobil</h1>

    <button
      @click="logout"
      class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
      Logout
    </button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout as doLogout } from '../services/auth.service'

const router = useRouter()

const logout = () => {
  doLogout()
  router.push('/login')
}
</script>
