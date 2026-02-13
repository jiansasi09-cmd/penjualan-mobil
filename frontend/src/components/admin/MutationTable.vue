<template>
  <BaseTable
    :headers="['Mobil', 'Qty', 'Tipe', 'Reference', 'Tanggal']"
    :keys="['mobilNama', 'qty', 'type', 'reference', 'createdAt']"
    :data="formattedData"
  >
    <template #action="{ row }">
      <router-link
        :to="`/admin/mutation/detail/${row.id}`"
        class="text-green-600 hover:underline mr-3"
      >
        Detail
      </router-link>

      <router-link
        :to="`/admin/mutation/edit/${row.id}`"
        class="text-blue-600 hover:underline mr-3"
      >
        Edit
      </router-link>

      <button
        @click="hapus(row.id)"
        class="text-red-600 hover:underline"
      >
        Hapus
      </button>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'
import { deleteMutation } from '@/services/mutation.service'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['reload'])

const formattedData = computed(() => {
  return props.data.map(item => ({
    ...item,
    mobilNama: item.mobil?.nama || '-',
    createdAt: new Date(item.createdAt).toLocaleDateString()
  }))
})

const hapus = async (id) => {
  if (!confirm('Yakin ingin hapus mutasi ini?')) return
  await deleteMutation(id)
  alert('Mutasi berhasil dihapus')
  emit('reload')
}
</script>
