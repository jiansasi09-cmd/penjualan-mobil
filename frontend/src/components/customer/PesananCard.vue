<template>
  <div class="border rounded p-4 shadow">
    <div class="flex justify-between">
      <h3 class="font-semibold">{{ pesanan.mobil.nama }}</h3>
      <StatusBadge :status="pesanan.status" />
    </div>

    <p class="text-sm mt-2">
      Tanggal: {{ pesanan.tanggal }}
    </p>

    <UploadBuktiBayar
      v-if="pesanan.status === 'MENUNGGU_PEMBAYARAN'"
      :pesananId="pesanan.id"
    />
  </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue'
import UploadBuktiBayar from './UploadBuktiBayar.vue'

defineProps({
  pesanan: Object
})
</script>
