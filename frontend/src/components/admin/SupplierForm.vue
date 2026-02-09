<template>
  <form @submit.prevent="submit" class="space-y-6">

    <!-- DATA SUPPLIER -->
    <div class="border p-4 rounded space-y-4">
      <h2 class="font-semibold">Data Supplier</h2>

      <BaseInput
        label="Nama Supplier"
        v-model="form.nama"
      />

      <BaseInput
        label="No Telp"
        v-model="form.noTelp"
      />

      <BaseInput
        label="Alamat"
        v-model="form.alamat"
      />
    </div>

    <!-- DATA PEMBELIAN -->
    <div class="border p-4 rounded space-y-4">
      <h2 class="font-semibold">Data Pembelian</h2>

      <BaseInput
        label="Tanggal Pembelian"
        type="date"
        v-model="form.pembelian.tanggal"
      />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          label="Nama Mobil"
          v-model="form.pembelian.detail.mobil.nama"
        />

        <BaseInput
          label="Qty"
          type="number"
          v-model="form.pembelian.detail.qty"
        />
      </div>
    </div>

    <BaseButton type="submit" class="w-full">
      {{ isEdit ? 'Update Supplier' : 'Simpan Supplier' }}
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
  alamat: '',
  pembelian: {
    tanggal: '',
    detail: {
      qty: 0,
      mobil: {
        nama: ''
      }
    }
  }
})

// mode edit
watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true }
)

const submit = () => {
  emit('submit', {
    nama: form.nama,
    noTelp: form.noTelp,
    alamat: form.alamat,
    pembelian: [
      {
        tanggal: form.pembelian.tanggal,
        detail: [
          {
            qty: Number(form.pembelian.detail.qty),
            mobil: {
              nama: form.pembelian.detail.mobil.nama
            }
          }
        ]
      }
    ]
  })
}
</script>
