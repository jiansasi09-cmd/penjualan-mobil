<template>
  <BaseTable
    :headers="HEADERS"
    :keys="KEYS"
    :data="data"
  >
    <!-- STATUS -->
    <template #cell-status="{ value }">
      <span
        :class="{
          'text-yellow-600 font-semibold': value === 'DRAFT',
          'text-green-600 font-semibold': value === 'DITERIMA',
          'text-red-600 font-semibold': value === 'DIBATALKAN'
        }"
      >
        {{ value }}
      </span>
    </template>

    <!-- ACTION -->
      <template #action="{ row }">
        <div class="flex gap-4 items-center text-lg">

          <!-- 🔍 Detail -->
          <router-link
            :to="`/admin/goods-receipt/detail/${row.id}`"
            class="text-gray-600 hover:scale-110 cursor-pointer"
          >
            🔍
          </router-link>

          <!-- ✏ Edit -->
          <router-link
            :to="`/admin/goods-receipt/edit/${row.id}`"
            class="text-blue-600 hover:scale-110 cursor-pointer"
          >
            ✏
          </router-link>

          <!-- 🧾 Invoice -->
          <router-link
            v-if="row.status === 'DITERIMA' && !row.hasInvoice"
            :to="`/admin/purchase-invoice/create/${row.id}`"
            class="text-green-600 hover:scale-110 cursor-pointer"
          >
            🧾
          </router-link>

          <!-- 🗑 Delete -->
          <button
            class="text-red-600 hover:scale-110 cursor-pointer"
            @click="$emit('delete', row)"
          >
            🗑
          </button>

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

const HEADERS = ['Kode GR', 'PO', 'Supplier', 'Tanggal', 'Status']
const KEYS = ['kode', 'poKode', 'supplier', 'tanggal', 'status']
</script>
