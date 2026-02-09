<template>
  <BaseTable
    :headers="[
      'Nama Customer',
      'Email',
      'No Telp',
      'Alamat',
      'Terdaftar',
    ]"
    :keys="[
      'nama',
      'email',
      'noTelp',
      'alamat',
      'createdAt'
    ]"
    :data="formattedData"
  >
    <template #action="{ row }">
      <router-link
        :to="`/admin/customer/detail/${row.id}`"
        class="text-blue-600 hover:underline"
      >
        Detail
      </router-link>
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
    alamat: c.alamat || '-',
    createdAt: new Date(c.createdAt).toLocaleDateString('id-ID')
  }))
)
</script>
