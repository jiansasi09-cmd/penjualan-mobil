<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Mutasi Stok</h1>
      <button @click="openForm()" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah Mutasi</button>
    </div>

    <table class="w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Mobil</th>
          <th class="p-2 border">Qty</th>
          <th class="p-2 border">Tipe</th>
          <th class="p-2 border">Reference</th>
          <th class="p-2 border">Tanggal</th>
          <th class="p-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in mutations" :key="m.id">
          <td class="p-2 border">{{ m.mobil.nama }}</td>
          <td class="p-2 border">{{ m.qty }}</td>
          <td class="p-2 border">{{ m.type }}</td>
          <td class="p-2 border">{{ m.reference }}</td>
          <td class="p-2 border">{{ new Date(m.createdAt).toLocaleString() }}</td>
          <td class="p-2 border flex gap-2">
            <button @click="editMutation(m)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
            <button @click="deleteMutation(m.id)" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <StockMutationForm v-if="selected" :mutation="selected" @close="selected=null; loadMutations()" />
  </div>
</template>

<script>
import stockService from '@/services/stock.service'
import StockMutationForm from './StockMutationForm.vue'

export default {
  components: { StockMutationForm },
  data() {
    return {
      mutations: [],
      selected: null
    }
  },
  mounted() {
    this.loadMutations()
  },
  methods: {
    async loadMutations() {
      const res = await stockService.getMutations()
      this.mutations = res.data
    },
    openForm() {
      this.selected = {}
    },
    editMutation(mutation) {
      this.selected = mutation
    },
    async deleteMutation(id) {
      if (confirm('Yakin hapus mutasi ini?')) {
        await stockService.deleteMutation(id)
        this.loadMutations()
      }
    }
  }
}
</script>
