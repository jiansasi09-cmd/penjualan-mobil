<template>
  <BaseTable
    :headers="['Nama', 'Email', 'No Telp', 'Alamat']"
    :keys="['nama', 'email', 'noTelp', 'alamat']"
    :data="formattedData"
  >
    <template #action="{ row }">
      <button
        @click="$emit('edit', row)"
        class="text-yellow-600 hover:underline"
      >
        Edit
      </button>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const formattedData = computed(() =>
  props.data.map(c => ({
    ...c,
    alamat: c.alamat || '-'
  }))
)
</script>
