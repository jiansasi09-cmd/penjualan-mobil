<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Edit Purchase Order</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <!-- Status -->
      <div>
        <label class="block mb-1 font-medium">Status</label>
        <select
          v-model="form.status"
          class="border w-full p-2 rounded"
          :disabled="loading"
        >
          <option value="">-- Pilih Status --</option>
          <option value="DRAFT">DRAFT</option>
          <option value="DIKIRIM">DIKIRIM</option>
          <option value="DITERIMA">DITERIMA</option>
        </select>
      </div>

      <!-- Tombol Submit -->
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="loading || !form.status"
      >
        {{ loading ? 'Menyimpan...' : 'Update' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPOById, updatePOStatus } from '@/services/purchaseOrder.service'

const route = useRoute()
const router = useRouter()
const poId = Number(route.params.id)

const form = ref({
  status: ''
})

const loading = ref(false)
const error = ref(null)

/* =========================
   Load PO
========================= */
const loadPO = async () => {
  loading.value = true
  error.value = null
  try {
    const data = await getPOById(poId)
    if (!data) throw new Error('Data PO tidak ditemukan')
    form.value.status = data.status
  } catch (err) {
    console.error(err)
    error.value = err.message || 'Gagal mengambil data PO'
    alert(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(loadPO)

/* =========================
   Update PO
========================= */
const submit = async () => {
  if (!form.value.status) {
    alert('Status tidak boleh kosong')
    return
  }

  loading.value = true
  error.value = null
  try {
    await updatePOStatus(poId, form.value.status)
    alert('PO berhasil diupdate')
    router.push('/admin/purchase-order')
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.message || 'Gagal update PO'
    alert(error.value)
  } finally {
    loading.value = false
  }
}
</script>
