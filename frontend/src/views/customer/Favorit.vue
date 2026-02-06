<template>
  <div>

    <h1 class="text-xl font-bold p-4">Favorit Saya</h1>

    <div class="grid grid-cols-4 gap-4 p-4">
      <MobilCard
        v-for="f in favorit"
        :key="f.id"
        :mobil="f.mobil"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getFavorit } from '@/services/favorit.service'

import CustomerNavbar from '@/components/customer/CustomerNavbar.vue'
import MobilCard from '@/components/customer/MobilCard.vue'

const favorit = ref([])

onMounted(async () => {
  favorit.value = await getFavorit()
})
</script>
