<template>
  <div class="mt-3">
    <input type="file" @change="upload" />
  </div>
</template>

<script setup>
import { uploadBukti } from '@/services/pembayaranCustomer.service'

const props = defineProps({
  pesananId: Number
})

const upload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  await uploadBukti(props.pesananId, formData)
  alert('Bukti pembayaran dikirim')
}
</script>
