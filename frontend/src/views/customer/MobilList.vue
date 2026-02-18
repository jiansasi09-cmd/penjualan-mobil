<template>
  <div>
    <div class="grid grid-cols-4 gap-4 p-4">
      <MobilCard
        v-for="mobil in mobils"
        :key="mobil.id"
        :mobil="mobil"
        :favorit-list="favorit"
        @toggle-favorit="handleToggleFavorit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMobil } from '@/services/mobil.service'
import { getFavorit, toggleFavorit } from '@/services/favorit.service'
import MobilCard from '@/components/customer/MobilCard.vue'

// state
const mobils = ref([])   // ✅ harus plural
const favorit = ref([])

// ambil customerId dari login / token
const customerId = 1 // ganti sesuai state login

// fetch semua mobil dan favorit
onMounted(async () => {
  mobils.value = await getMobil()      // pakai getMobil() sesuai service
  favorit.value = await getFavorit()
})

// toggle favorit realtime
const handleToggleFavorit = async (mobilId, isFavorit) => {
  const res = await toggleFavorit(customerId, mobilId)
  favorit.value = res.favorit // update list favorit langsung
}
</script>
