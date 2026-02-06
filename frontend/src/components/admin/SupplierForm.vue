<template>
  <form @submit.prevent="submit" class="space-y-4 max-w-md">
    <BaseInput label="Nama" v-model="form.nama" />
    <BaseInput label="No Telp" v-model="form.noTelp" />
    <BaseInput label="Alamat" v-model="form.alamat" />

    <BaseButton type="submit" class="w-full">
      {{ isEdit ? 'Update' : 'Simpan' }}
    </BaseButton>
  </form>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { createSupplier, updateSupplier, getSupplierById } from '@/services/supplier.service'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.params.id

const form = reactive({
  nama: '',
  noTelp: '',
  alamat: ''
})

onMounted(async () => {
  if (isEdit) {
    const data = await getSupplierById(route.params.id)
    Object.assign(form, data)
  }
})

const submit = async () => {
  if (isEdit) {
    await updateSupplier(route.params.id, form)
  } else {
    await createSupplier(form)
  }

  router.push('/admin/supplier')
}
</script>
