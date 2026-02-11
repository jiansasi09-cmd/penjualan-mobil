<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const openMenu = ref({
  master: false,
  purchasing: false,
  inventory: false,
  sales: false,
  report: false
})


const toggle = (key) => {
  openMenu.value[key] = !openMenu.value[key]
}
</script>

<template>
  <aside class="w-64 bg-gray-900 text-gray-100 h-screen fixed left-0 top-0 flex flex-col">

    <!-- BRAND -->
    <div class="p-5 text-2xl font-bold tracking-wide border-b border-gray-800">
      🚗 Showroom
    </div>

    <!-- SCROLL AREA -->
    <div class="flex-1 overflow-y-auto px-4 py-4">

      <!-- DASHBOARD -->
      <RouterLink to="/admin/dashboard" class="nav" :class="{ active: route.path === '/admin/dashboard' }">
        📊 Dashboard
      </RouterLink>

      <!-- MASTER DATA -->
      <p class="menu-title" @click="toggle('master')">
        📁 Master Data
      </p>
      <ul v-show="openMenu.master" class="menu">
        <li><RouterLink to="/admin/mobil" class="nav">🚗 Item / Mobil</RouterLink></li>
        <li><RouterLink to="/admin/supplier" class="nav">🏭 Supplier</RouterLink></li>
        <li><RouterLink to="/admin/customer" class="nav">👤 Customer</RouterLink></li>
        <li><RouterLink to="/admin/sales" class="nav">👨‍💼 Sales / User</RouterLink></li>
      </ul>

      <!-- PURCHASING -->
      <p class="menu-title" @click="toggle('purchasing')">
        🛒 Purchasing
      </p>
      <ul v-show="openMenu.purchasing" class="menu">
        <li><RouterLink to="/admin/purchase-request" class="nav">Purchase Request</RouterLink></li>
        <li><RouterLink to="/admin/purchase-order" class="nav">Purchase Order</RouterLink></li>
        <li><RouterLink to="/admin/goods-receipt" class="nav">Penerimaan Barang</RouterLink></li>
        <li><RouterLink to="/admin/purchase-invoice" class="nav">Purchase Invoice</RouterLink></li>
      </ul>

      <!-- INVENTORY -->
      <p class="menu-title" @click="toggle('inventory')">
        📦 Inventory
      </p>
      <ul v-show="openMenu.inventory" class="menu">
        <li><RouterLink to="/admin/stok" class="nav">Stok</RouterLink></li>
        <li><RouterLink to="/admin/mutasi-stok" class="nav">Mutasi Stok</RouterLink></li>
      </ul>

      <!-- SALES -->
      <p class="menu-title" @click="toggle('sales')">
        💰 Sales
      </p>
      <ul v-show="openMenu.sales" class="menu">
        <li><RouterLink to="/admin/sales-order" class="nav">Sales Order</RouterLink></li>
        <li><RouterLink to="/admin/penjualan" class="nav">Penjualan</RouterLink></li>
        <li><RouterLink to="/admin/pembayaran" class="nav">Pembayaran</RouterLink></li>
      </ul>

      <!-- REPORT -->
      <p class="menu-title" @click="toggle('report')">
        📈 Report
      </p>
      <ul v-show="openMenu.report" class="menu">
        <li><RouterLink to="/admin/report-pembelian" class="nav">Laporan Pembelian</RouterLink></li>
        <li><RouterLink to="/admin/report-penjualan" class="nav">Laporan Penjualan</RouterLink></li>
        <li><RouterLink to="/admin/report-stok" class="nav">Laporan Stok</RouterLink></li>
      </ul>

    </div>

    <!-- FOOTER -->
    <div class="text-xs text-gray-500 p-4 border-t border-gray-800">
      Showroom Management System
    </div>

  </aside>
</template>

<style scoped>
.menu-title {
  @apply text-xs uppercase text-gray-400 mt-4 mb-2 tracking-wider cursor-pointer;
}

.menu {
  @apply space-y-1 mb-2 ml-2;
}

.nav {
  @apply block px-3 py-2 rounded-md text-sm text-gray-300
         hover:bg-gray-800 hover:text-white transition;
}

.router-link-active,
.active {
  @apply bg-gray-800 text-white font-semibold;
}

/* Scrollbar cantik */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 6px;
}
</style>
