<template>
  <BaseTable
    :headers="['PR Number', 'Supplier', 'Tanggal', 'Status']"
    :keys="['prNumber', 'supplier', 'tanggal', 'status']"
    :data="formattedData"
  >
    <template #action="{ row }">
      <div class="flex gap-3">
        <!-- Tombol Edit -->
        <router-link
          :to="`/admin/purchase-request/edit/${row.id}`"
          class="text-blue-600 hover:underline"
        >
          Edit
        </router-link>

        <!-- Tombol Hapus -->
        <button
          @click="del(row.id)"
          class="text-red-600 hover:underline"
        >
          Hapus
        </button>

        <!-- Tombol Approve untuk PR PENDING -->
        <button
          v-if="row.status === 'PENDING'"
          @click="approvePR(row.id)"
          class="bg-green-500 text-white px-2 py-1 rounded"
        >
          Approve
        </button>

        <!-- Tombol Buat PO untuk PR APPROVED -->
        <router-link
          v-if="row.status === 'APPROVED'"
          :to="`/admin/purchase-order/from-pr/${row.id}`"
          class="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Buat PO
        </router-link>
      </div>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import api from '@/services/api'
import { deletePR } from '@/services/purchaseRequest.service'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['deleted'])

// Hapus PR
const del = async (id) => {
  if (confirm('Yakin hapus PR ini?')) {
    await deletePR(id)
    emit('deleted')
  }
}

// Approve PR
const approvePR = async (id) => {
  try {
    await api.put(`/purchase-request/approve/${id}`)
    alert('PR berhasil di-approve!')
    emit('deleted') // emit agar parent reload data
  } catch (err) {
    console.error('Gagal approve PR: ', err)
    alert(err.response?.data?.message || 'Gagal approve PR')
  }
}

// Format data supplier dan tanggal
const formattedData = computed(() =>
  props.data.map(pr => ({
    ...pr,
    supplier: pr.supplier.nama,
    tanggal: new Date(pr.tanggal).toLocaleDateString('id-ID')
  }))
)
</script>
