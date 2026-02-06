<template>
  <div>

    <div class="grid grid-cols-4 gap-4 p-4">
      <MobilCard
        v-for="m in mobil"
        :key="m.id"
        :mobil="m"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMobil } from '@/services/mobil.service'

import CustomerNavbar from '@/components/customer/CustomerNavbar.vue'
import MobilCard from '@/components/customer/MobilCard.vue'

const mobil = ref([])

onMounted(async () => {
  mobil.value = await getMobil()
})
</script>
