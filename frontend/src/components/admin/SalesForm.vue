<template>
  <form @submit.prevent="submit" class="space-y-4">
    <BaseInput label="Nama" v-model="form.nama" />
    <BaseInput label="No Telp" v-model="form.noTelp" />
    <BaseInput label="Alamat" v-model="form.alamat" />

    <BaseButton type="submit" class="w-full">
      {{ isEdit ? 'Update' : 'Simpan' }}
    </BaseButton>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  modelValue: Object,
  isEdit: Boolean
})

const emit = defineEmits(['submit'])

const form = reactive({
  nama: '',
  noTelp: '',
  alamat: ''
})

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true }
)

const submit = () => {
  emit('submit', { ...form })
}
</script>
