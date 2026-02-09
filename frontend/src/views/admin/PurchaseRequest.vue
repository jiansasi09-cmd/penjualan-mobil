<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Purchase Requests</h1>

      <router-link
        to="/admin/purchase-request/add"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Tambah PR
      </router-link>
    </div>

    <PRTable :data="prs" @deleted="loadPRs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PRTable from '@/components/admin/PRTable.vue'
import { getPRs } from '@/services/purchaseRequest.service'

const prs = ref([])

const loadPRs = async () => {
  prs.value = await getPRs()
}

onMounted(loadPRs)
</script>
