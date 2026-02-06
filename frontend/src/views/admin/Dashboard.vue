<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-text-primary">
        Dashboard
      </h1>
      <p class="text-sm text-text-secondary">
        Kontrol operasional showroom
      </p>
    </div>

    <!-- ACTION REQUIRED -->
    <div
      v-if="actions.total > 0"
      class="rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <h2 class="font-semibold text-red-700 mb-3">
        Perlu Tindakan
      </h2>

      <ul class="space-y-2 text-sm text-red-600">
        <li v-if="actions.pending_pr">
          🛒 {{ actions.pending_pr }} Purchase Request menunggu approval
        </li>
        <li v-if="actions.unreceived_po">
          📦 {{ actions.unreceived_po }} PO belum diterima
        </li>
        <li v-if="actions.unpaid_invoice">
          💰 {{ actions.unpaid_invoice }} invoice belum dibayar
        </li>
        <li v-if="actions.low_stock">
          ⚠️ {{ actions.low_stock }} stok mobil menipis
        </li>
      </ul>
    </div>

    <!-- SUMMARY CARDS (TIDAK ADA DATA DOBEL) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard title="Mobil Tersedia" :value="stats.mobil" icon="🚗" />
      <DashboardCard title="Sales Aktif" :value="stats.sales" icon="👨‍💼" />
      <DashboardCard title="Penjualan Hari Ini" :value="stats.penjualan_hari_ini" icon="📈" />
      <DashboardCard title="Invoice Outstanding" :value="stats.invoice_outstanding" icon="💰" />
    </div>

    <!-- PURCHASING + INVENTORY -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Purchasing Status -->
      <div class="rounded-xl border p-4">
        <h3 class="font-medium mb-3">Status Purchasing</h3>
        <ul class="space-y-2 text-sm text-text-secondary">
          <li>PR Pending: {{ purchasing.pr_pending }}</li>
          <li>PO Aktif: {{ purchasing.po_aktif }}</li>
          <li>Invoice Open: {{ purchasing.invoice_open }}</li>
        </ul>
      </div>

      <!-- Inventory Alert -->
      <div class="rounded-xl border p-4">
        <h3 class="font-medium mb-3">Inventory Alert</h3>
        <ul
          v-if="inventory.low_stock.length"
          class="space-y-2 text-sm text-text-secondary"
        >
          <li
            v-for="item in inventory.low_stock"
            :key="item.id"
          >
            ⚠️ {{ item.nama }} (sisa {{ item.stok }})
          </li>
        </ul>
        <p v-else class="text-sm text-green-600">
          ✅ Semua stok aman
        </p>
      </div>
    </div>

    <!-- RECENT ACTIVITIES -->
    <div class="rounded-xl border p-4">
      <h3 class="font-medium mb-3">Aktivitas Terbaru</h3>
      <ul class="space-y-2 text-sm text-text-secondary">
        <li
          v-for="log in activities"
          :key="log.id"
        >
          {{ log.time }} — {{ log.message }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import DashboardCard from '@/components/admin/DashboardCard.vue'
import api from '@/services/api'

const stats = ref({
  mobil: 0,
  sales: 0,
  penjualan_hari_ini: 0,
  invoice_outstanding: 0
})

const actions = ref({
  pending_pr: 0,
  unreceived_po: 0,
  unpaid_invoice: 0,
  low_stock: 0,
  total: 0
})

const purchasing = ref({
  pr_pending: 0,
  po_aktif: 0,
  invoice_open: 0
})

const inventory = ref({
  low_stock: []
})

const activities = ref([])

onMounted(async () => {
  const res = await api.get('/dashboard')

  stats.value = res.data.stats
  actions.value = {
    ...res.data.actions,
    total: Object.values(res.data.actions).reduce((a, b) => a + b, 0)
  }
  purchasing.value = res.data.purchasing
  inventory.value = res.data.inventory
  activities.value = res.data.activities
})
</script>
