<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    
    <!-- Modal Box -->
    <div class="bg-white w-full max-w-lg p-6 rounded shadow-lg">
      
      <h2 class="text-xl font-bold mb-4">
        {{ stock?.id ? 'Edit Stok' : 'Tambah Stok' }}
      </h2>

      <form @submit.prevent="submit" class="space-y-3">

        <div>
          <label class="block text-sm font-medium mb-1">Nama Mobil</label>
          <input type="text" v-model="form.nama" disabled
            class="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Merk</label>
          <input type="text" v-model="form.merk" disabled
            class="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Tipe</label>
          <input type="text" v-model="form.tipe" disabled
            class="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Tahun</label>
          <input type="text" v-model="form.tahun" disabled
            class="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Warna</label>
          <input type="text" v-model="form.warna" disabled
            class="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Stok</label>
          <input type="number" v-model="form.stok"
            class="w-full border rounded px-3 py-2" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Batal
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { updateStock } from '@/services/stock.service'

const props = defineProps({
  stock: Object
})

const emit = defineEmits(['close', 'saved'])

const form = reactive({
  id: null,
  nama: '',
  merk: '',
  tipe: '',
  tahun: '',
  warna: '',
  stok: 0
})

// Update form saat stock berubah
watch(
  () => props.stock,
  (val) => {
    if (val) {
      form.id = val.id
      form.nama = val.nama
      form.merk = val.merk
      form.tipe = val.tipe
      form.tahun = val.tahun
      form.warna = val.warna
      form.stok = val.stok
    }
  },
  { immediate: true }
)

const submit = async () => {
  if (!form.id) return

  try {
    await updateStock(form.id, { stok: form.stok })
    emit('saved')
    emit('close')
  } catch (err) {
    console.error('Gagal update stok:', err)
  }
}
</script>
