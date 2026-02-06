<template>
  <form @submit.prevent="submit" class="space-y-4">

    <!-- IDENTITAS -->
    <BaseInput label="Nama Mobil" v-model="form.nama" />
    <BaseInput label="Merk" v-model="form.merk" />
    <BaseInput label="Tipe / Varian" v-model="form.tipe" />

    <!-- SPESIFIKASI -->
    <BaseInput label="Tahun" type="number" v-model="form.tahun" />
    <BaseInput label="Warna" v-model="form.warna" />
    <BaseInput label="Kilometer (KM)" type="number" v-model="form.kilometer" />

    <BaseSelect
      label="Transmisi"
      v-model="form.transmisi"
      :options="['Manual', 'Automatic']"
    />

    <BaseSelect
      label="Bahan Bakar"
      v-model="form.bahan_bakar"
      :options="['Bensin', 'Diesel', 'Hybrid', 'Listrik']"
    />

    <!-- BISNIS -->
    <BaseInput label="Harga Jual" type="number" v-model="form.harga" />
    <BaseInput label="Stok" type="number" v-model="form.stok" />

    <BaseSelect
      label="Status Mobil"
      v-model="form.status"
      :options="['READY', 'BOOKED', 'TERJUAL']"
    />

    <BaseButton type="submit" class="w-full">
      {{ isEdit ? 'Update Mobil' : 'Simpan Mobil' }}
    </BaseButton>
  </form>
</template>
<script setup>
import { reactive, watch } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'

const props = defineProps({
  modelValue: Object,
  isEdit: Boolean
})

const emit = defineEmits(['submit'])

const form = reactive({
  nama: '',
  merk: '',
  tipe: '',
  tahun: new Date().getFullYear(),
  warna: '',
  kilometer: 0,
  transmisi: 'Manual',
  bahan_bakar: 'Bensin',
  harga: 0,
  stok: 1,
  status: 'READY'
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
    ...form,
    harga: Number(form.harga),
    kilometer: Number(form.kilometer),
    stok: Number(form.stok)
  })
}
</script>
