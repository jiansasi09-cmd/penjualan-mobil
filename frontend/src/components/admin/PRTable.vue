<template>
  <BaseTable
    :headers="['PR Number', 'Supplier', 'Tanggal', 'Status']"
    :keys="['prNumber', 'supplier', 'tanggal', 'status']"
    :data="formattedData"
  >
    <template #aksi="{ row }">
      <div class="flex gap-3">
        <router-link
          :to="`/admin/purchase-request/edit/${row.id}`"
          class="text-blue-600 hover:underline"
        >
          Edit
        </router-link>

        <button
          @click="del(row.id)"
          class="text-red-600 hover:underline"
        >
          Hapus
        </button>
      </div>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import { deletePR } from '@/services/purchaseRequest.service'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['deleted'])

const del = async (id) => {
  if (confirm('Yakin hapus PR ini?')) {
    await deletePR(id)
    emit('deleted')
  }
}

const formattedData = computed(() =>
  props.data.map(pr => ({
    ...pr,
    supplier: pr.supplier.nama,
    tanggal: new Date(pr.tanggal).toLocaleDateString('id-ID')
  }))
)
</script>
