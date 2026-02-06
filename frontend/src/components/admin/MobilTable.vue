<template>
  <BaseTable
    :headers="[
      'Nama',
      'Merk',
      'Tipe',
      'Tahun',
      'Warna',
      'Transmisi',
      'BBM',
      'KM',
      'Harga Jual',
      'Stok',
      'Status',
      'Aksi'
    ]"
    :keys="[
      'nama',
      'merk',
      'tipe',
      'tahun',
      'warna',
      'transmisi',
      'bahan_bakar',
      'kilometer',
      'harga',
      'stok',
      'status'
    ]"
    :data="data"
  >
    <template #cell-harga="{ value }">
      Rp {{ Number(value).toLocaleString('id-ID') }}
    </template>

    <template #cell-status="{ value }">
      <span
        :class="{
          'text-green-600 font-semibold': value === 'READY',
          'text-yellow-600 font-semibold': value === 'BOOKED',
          'text-red-600 font-semibold': value === 'TERJUAL'
        }"
      >
        {{ value }}
      </span>
    </template>

    <template #action="{ row }">
      <div class="flex gap-3">
        <router-link
          :to="`/admin/mobil/edit/${row.id}`"
          class="text-blue-600 hover:underline"
        >
          Edit
        </router-link>

        <router-link
          :to="`/admin/mobil/detail/${row.id}`"
          class="text-gray-600 hover:underline"
        >
          Detail
        </router-link>
      </div>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/common/BaseTable.vue'

defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
</script>
