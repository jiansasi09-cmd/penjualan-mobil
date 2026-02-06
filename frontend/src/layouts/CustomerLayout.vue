<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <CustomerSidebar />

    <!-- Content -->
    <div class="flex-1 flex flex-col ml-64">
      <!-- Navbar -->
      <CustomerNavbar />

      <!-- Main Content -->
      <main class="p-6 flex-1 overflow-y-auto">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import CustomerSidebar from '@/components/customer/CustomerSidebar.vue'
import CustomerNavbar from '@/components/customer/CustomerNavbar.vue'
</script>
