<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded w-2/3">
      <h2 class="text-lg font-bold mb-4">Pilih PR</h2>

      <table class="w-full border">
        <thead>
          <tr>
            <th>PR Number</th>
            <th>Supplier</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pr in prs" :key="pr.id">
            <td>{{ pr.prNumber }}</td>
            <td>{{ pr.supplier.nama }}</td>
            <td>{{ formatDate(pr.tanggal) }}</td>
            <td>
              <button
                class="bg-green-500 text-white px-2 py-1 rounded"
                @click="selectPR(pr.id)"
              >
                Pilih
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        class="mt-4 bg-gray-500 text-white px-3 py-1 rounded"
        @click="closeModal"
      >
        Tutup
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPRs } from '@/services/purchaseRequest.service'

// 1️⃣ Props & Emits
const emit = defineEmits(['created','close'])

// 2️⃣ Reactive
const prs = ref([])

// 3️⃣ Load PR
const loadPRs = async () => {
  try {
    prs.value = await getPRs()
  } catch (err) {
    console.error('Gagal load PR:', err)
  }
}

// 4️⃣ Format tanggal
const formatDate = (d) => new Date(d).toLocaleDateString('id-ID')

// 5️⃣ Pilih PR → kirim ke parent
const selectPR = (prId) => {
  emit('created', prId) // kirim ke parent
  emit('close')          // tutup modal
}

// 6️⃣ Tutup modal
const closeModal = () => emit('close')

// 7️⃣ Load saat mounted
onMounted(loadPRs)
</script>
