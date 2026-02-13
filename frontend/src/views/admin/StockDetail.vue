<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded w-96 max-h-[80vh] overflow-auto">
      <h2 class="text-lg font-bold mb-4">Detail Stok</h2>
      <p><strong>Nama:</strong> {{ stock.nama }}</p>
      <p><strong>Merk:</strong> {{ stock.merk }}</p>
      <p><strong>Tipe:</strong> {{ stock.tipe }}</p>
      <p><strong>Stok:</strong> {{ stock.stok }}</p>

      <h3 class="mt-4 font-semibold">Mutasi Stok</h3>
      <table class="min-w-full border mt-2">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Tanggal</th>
            <th class="p-2 border">Qty</th>
            <th class="p-2 border">Tipe</th>
            <th class="p-2 border">Reference</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in mutations" :key="m.id" class="border-t">
            <td class="p-2 border">{{ new Date(m.createdAt).toLocaleString() }}</td>
            <td class="p-2 border">{{ m.qty }}</td>
            <td class="p-2 border">{{ m.type }}</td>
            <td class="p-2 border">{{ m.reference }}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mt-4">
        <button @click="$emit('close')" class="bg-gray-500 text-white px-3 py-1 rounded">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getMutations } from '@/services/stock.service'

export default {
  props: {
    stock: Object
  },
  data() {
    return {
      mutations: []
    }
  },
  mounted() {
    this.loadMutations()
  },
  methods: {
    async loadMutations() {
      const data = await getMutations(this.stock.id)
      this.mutations = data
    }
  }
}
</script>
