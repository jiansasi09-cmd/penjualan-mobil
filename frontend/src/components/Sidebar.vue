<template>
  <aside class="w-64 bg-gray-900 text-gray-100 min-h-screen p-5 shadow-lg">
    <h2 class="text-2xl font-bold mb-8 tracking-wide">Showroom Admin</h2>

    <!-- DASHBOARD -->
    <p class="menu-title">Main</p>
    <ul class="menu">
      <li>
        <router-link to="/" class="nav">Dashboard</router-link>
      </li>
    </ul>

    <!-- MASTER DATA -->
    <p class="menu-title">Master Data</p>
    <ul class="menu">
      <li>
        <router-link to="/mobil" class="nav">Data Mobil</router-link>
      </li>
      <li>
        <router-link to="/customer" class="nav">Data Customer</router-link>
      </li>
      <li>
        <router-link to="/sales" class="nav">Data Sales</router-link>
      </li>
    </ul>

    <!-- TRANSAKSI -->
    <p class="menu-title">Transaksi</p>
    <ul class="menu">
      <li>
        <router-link to="/penjualan" class="nav">Penjualan Mobil</router-link>
      </li>
      <li>
        <router-link to="/pembelian" class="nav">Pembelian Stok</router-link>
      </li>
    </ul>

    <!-- FOOTER -->
    <div class="text-xs text-gray-500 mt-10 border-t border-gray-800 pt-4">
      Sistem Manajemen Showroom Mobil
    </div>
  </aside>
</template>

<style scoped>
.menu-title {
  @apply text-xs uppercase text-gray-400 mt-4 mb-2 tracking-wider;
}

.menu {
  @apply space-y-1 mb-3;
}

.nav {
  @apply block px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition;
}

.router-link-active {
  @apply bg-gray-800 text-white font-semibold;
}
</style>
