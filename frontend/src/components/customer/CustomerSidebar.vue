<template>
  <aside
    class="w-64 bg-blue-900 text-blue-100 min-h-screen
           p-5 shadow-lg fixed left-0 top-0"
  >
    <!-- BRAND -->
    <h2 class="text-2xl font-bold mb-8 tracking-wide">
      🚗 Customer Panel
    </h2>

    <!-- MENU -->
    <p class="menu-title">Menu</p>
    <ul class="menu">
      <li>
        <RouterLink to="/customer/mobil" class="nav">
          Mobil
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/customer/favorit" class="nav">
          Favorit
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/customer/booking" class="nav">
          Booking
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/customer/pesanan" class="nav">
          Pesanan
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/customer/pembayaran" class="nav">
          Pembayaran
        </RouterLink>
      </li>
    </ul>

    <!-- FOOTER -->
    <div class="text-xs text-blue-300 mt-10 border-t border-blue-800 pt-4">
      Customer Area
    </div>
  </aside>
</template>

<style scoped>
.menu-title {
  @apply text-xs uppercase text-blue-300 mt-4 mb-2 tracking-wider;
}

.menu {
  @apply space-y-1 mb-3;
}

.nav {
  @apply block px-3 py-2 rounded-md text-sm
         hover:bg-blue-800 transition;
}

.router-link-active {
  @apply bg-blue-800 text-white font-semibold;
}
</style>
