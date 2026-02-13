<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded w-96">
      <h2 class="text-lg font-bold mb-4">{{ stock?.id ? 'Edit' : 'Tambah' }} Stok</h2>

      <form @submit.prevent="submit">
        <div class="mb-2">
          <label class="block mb-1">Nama Mobil</label>
          <input type="text" v-model="form.nama" class="w-full border p-2" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1">Merk</label>
          <input type="text" v-model="form.merk" class="w-full border p-2" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1">Tipe</label>
          <input type="text" v-model="form.tipe" class="w-full border p-2" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1">Stok</label>
          <input type="number" v-model="form.stok" class="w-full border p-2" required />
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-3 py-1 rounded">Batal</button>
          <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getStock, deleteStock, updateStock } from '@/services/stock.service'


export default {
  props: {
    stock: Object
  },
  data() {
    return {
      form: {
        id: this.stock?.id || null,
        nama: this.stock?.nama || '',
        merk: this.stock?.merk || '',
        tipe: this.stock?.tipe || '',
        stok: this.stock?.stok || 0
      }
    }
  },
  methods: {
    async submit() {
      if (this.form.id) {
        await stockService.updateStock(this.form.id, this.form)
      } else {
        await stockService.createStock(this.form)
      }
      this.$emit('saved')
      this.$emit('close')
    }
  }
}
</script>
