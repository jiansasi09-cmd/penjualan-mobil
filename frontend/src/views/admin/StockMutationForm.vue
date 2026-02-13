<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
    <div class="bg-white p-6 rounded w-96">
      <h2 class="text-lg font-bold mb-4">{{ mutation.id ? 'Edit' : 'Tambah' }} Mutasi Stok</h2>

      <form @submit.prevent="submit">
        <div class="mb-2">
          <label class="block mb-1">Mobil</label>
          <select v-model="form.mobilId" required class="w-full border p-2">
            <option v-for="m in stockList" :key="m.id" :value="m.id">{{ m.nama }}</option>
          </select>
        </div>

        <div class="mb-2">
          <label class="block mb-1">Qty</label>
          <input type="number" v-model="form.qty" class="w-full border p-2" required />
        </div>

        <div class="mb-2">
          <label class="block mb-1">Tipe</label>
          <select v-model="form.type" class="w-full border p-2">
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
            <option value="ADJUSTMENT">ADJUSTMENT</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block mb-1">Reference</label>
          <input type="text" v-model="form.reference" class="w-full border p-2" />
        </div>

        <div class="flex justify-end gap-2">
          <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-3 py-1 rounded">Batal</button>
          <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import stockService from '@/services/stock.service'

export default {
  props: {
    mutation: Object,
    stock: Array
  },
  data() {
    return {
      form: {
        id: this.mutation?.id || null,
        mobilId: this.mutation?.mobilId || (this.stock?.id || null),
        qty: this.mutation?.qty || 0,
        type: this.mutation?.type || 'IN',
        reference: this.mutation?.reference || ''
      },
      stockList: []
    }
  },
  mounted() {
    this.loadStock()
  },
  methods: {
    async loadStock() {
      const res = await stockService.getStock()
      this.stockList = res.data
      if (!this.form.mobilId && this.stockList.length > 0) this.form.mobilId = this.stockList[0].id
    },
    async submit() {
      if (this.form.id) {
        await stockService.updateMutation(this.form.id, this.form)
      } else {
        await stockService.createMutation(this.form)
      }
      this.$emit('close')
    }
  }
}
</script>
