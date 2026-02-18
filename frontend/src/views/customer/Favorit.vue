<template>
  <div>
    <CustomerNavbar />

    <h1 class="text-xl font-bold p-4">Favorit Saya</h1>

    <div class="grid grid-cols-4 gap-4 p-4">
      <MobilCard
        v-for="f in favorit"
        :key="f.mobil.id"
        :mobil="f.mobil"
        :favorit-list="favorit"
        @toggle-favorit="handleToggleFavorit"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getFavorit, toggleFavorit } from '@/services/favorit.service'
import CustomerNavbar from '@/components/customer/CustomerNavbar.vue'
import MobilCard from '@/components/customer/MobilCard.vue'

// simulasikan customerId (bisa dari store atau token decode)
const customerId = 1

const favorit = ref([])

// load favorit saat mounted
onMounted(async () => {
  favorit.value = await getFavorit()
})

// toggle favorit realtime
const handleToggleFavorit = async (mobilId, isFavorit) => {
  const res = await toggleFavorit(customerId, mobilId)
  favorit.value = res.favorit // update list favorit langsung
}
</script>
