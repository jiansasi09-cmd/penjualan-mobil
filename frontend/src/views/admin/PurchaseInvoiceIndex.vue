<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Purchase Invoice</h1>
    </div>

    <PurchaseInvoiceTable :data="invoices" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPurchaseInvoices } from '@/services/purchaseInvoice.service'
import PurchaseInvoiceTable from '@/components/admin/PurchaseInvoiceTable.vue'

const invoices = ref([])

const load = async () => {
  invoices.value = await getPurchaseInvoices()
}

onMounted(load)
</script>
