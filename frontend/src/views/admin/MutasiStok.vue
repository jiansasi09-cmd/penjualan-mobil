<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Mutasi Stok</h1>

      <router-link
        to="/admin/mutation/add"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tambah Mutasi
      </router-link>
    </div>

    <MutationTable
      :data="mutationList"
      @reload="loadData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMutations } from '@/services/mutation.service'
import MutationTable from '@/components/admin/MutationTable.vue'

const mutationList = ref([])

const loadData = async () => {
  mutationList.value = await getMutations()
}

onMounted(() => {
  loadData()
})
</script>
