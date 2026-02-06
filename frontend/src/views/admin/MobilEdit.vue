<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4">Edit Mobil</h1>

    <MobilForm
      :model-value="mobil"
      is-edit
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MobilForm from '@/components/admin/MobilForm.vue'
import { getMobilById, updateMobil } from '@/services/mobil.service'

const route = useRoute()
const router = useRouter()
const mobil = ref(null)

onMounted(async () => {
  mobil.value = await getMobilById(route.params.id)
})

const handleSubmit = async (data) => {
  await updateMobil(route.params.id, data)
  router.push('/admin/mobil')
}
</script>
