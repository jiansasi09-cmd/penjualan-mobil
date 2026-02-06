<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Daftar Mobil</h1>

      <router-link
        to="/admin/mobil/add"
        class="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Tambah Mobil
      </router-link>
    </div>

    <MobilTable :data="mobils" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MobilTable from '@/components/admin/MobilTable.vue'
import { getMobil } from '@/services/mobil.service'

const mobils = ref([])

const load = async () => {
  mobils.value = await getMobil()
}

onMounted(load)
</script>
