<template>
  <table class="w-full border">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-2">Nomor</th>
        <th class="p-2">Customer</th>
        <th class="p-2">Total</th>
        <th class="p-2">Status</th>
        <th class="p-2">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id" class="border-t">
        <td class="p-2">{{ row.nomor }}</td>
        <td class="p-2">{{ row.customer.nama }}</td>
        <td class="p-2">Rp {{ row.total.toLocaleString() }}</td>
        <td class="p-2">
          <span class="px-2 py-1 rounded text-white text-xs"
                :class="statusColor(row.status)">
            {{ row.status }}
          </span>
        </td>
        <td class="p-2 space-x-2">

        <RouterLink
            :to="`/admin/sales-order/${row.id}`"
            class="bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
            Detail
        </RouterLink>

        <RouterLink
            v-if="row.status === 'DRAFT'"
            :to="`/admin/sales-order/${row.id}/edit`"
            class="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
        >
            Edit
        </RouterLink>

        <button
            v-if="row.status === 'DRAFT'"
            @click="approve(row.id)"
            class="bg-green-500 text-white px-2 py-1 rounded text-xs"
        >
            Approve
        </button>

        <button
            @click="remove(row.id)"
            class="bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
            Hapus
        </button>

        </td>

      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { updateStatusSalesOrder, deleteSalesOrder } from '@/services/salesOrder.service'


const props = defineProps(['data'])
const emit = defineEmits(['refresh'])

const approve = async (id) => {
  await updateStatusSalesOrder(id, 'APPROVED')
  emit('refresh')
}


const remove = async (id) => {
  if (confirm('Yakin hapus?')) {
    await deleteSalesOrder(id)
    emit('refresh')
  }
}

const statusColor = (status) => {
  if (status === 'APPROVED') return 'bg-green-500'
  if (status === 'CANCELLED') return 'bg-red-500'
  return 'bg-yellow-500'
}
</script>
