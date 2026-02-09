<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Edit Supplier</h1>

    <form @submit.prevent="submit" class="space-y-4 max-w-md">
      <BaseInput v-model="form.nama" placeholder="Nama Supplier" />
      <BaseInput v-model="form.noTelp" placeholder="No Telp" />
      <BaseInput v-model="form.alamat" placeholder="Alamat" />

      <BaseButton type="submit">Update</BaseButton>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { getSupplierById, updateSupplier } from '@/services/supplier.service'

const route = useRoute()
const router = useRouter()

const form = reactive({
  nama: '',
  noTelp: '',
  alamat: ''
})

onMounted(async () => {
  const data = await getSupplierById(route.params.id)
  Object.assign(form, data)
})

const submit = async () => {
  await updateSupplier(route.params.id, form)
  router.push('/admin/supplier')
}
</script>
