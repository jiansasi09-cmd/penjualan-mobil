<template>
  <form @submit.prevent="submit" class="space-y-4">

    <!-- Customer -->
    <div>
      <label class="block mb-1 font-semibold">Customer</label>
      <select v-model="form.customerId" class="border p-2 w-full" required>
        <option disabled value="">Pilih Customer</option>
        <option v-for="c in customers" :key="c.id" :value="c.id">
          {{ c.nama }}
        </option>
      </select>
    </div>

    <!-- Items -->
    <div v-for="(item, i) in form.items" :key="i" class="flex gap-2 items-center">

      <!-- Mobil -->
      <div class="flex-1">
        <label class="block mb-1 font-semibold">Mobil</label>
        <select 
          v-model="item.mobilId" 
          @change="setHargaItem(item)" 
          class="border p-2 w-full"
          required
        >
          <option disabled value="">Pilih Mobil</option>
          <option v-for="m in mobils" :key="m.id" :value="m.id">
            {{ m.nama }}
          </option>
        </select>
      </div>

      <!-- Qty -->
      <div>
        <label class="block mb-1 font-semibold">Qty</label>
        <input
          v-model.number="item.qty"
          type="number"
          min="1"
          placeholder="Qty"
          class="border p-2 w-24"
          @input="updateTotalItem(item)"
          required
        />
      </div>

      <!-- Harga per unit -->
      <div>
        <label class="block mb-1 font-semibold">Harga / Unit</label>
        <input
          v-model.number="item.harga"
          type="number"
          placeholder="Harga"
          class="border p-2 w-32"
          readonly
        />
      </div>

      <!-- Total per item -->
      <div>
        <label class="block mb-1 font-semibold">Total</label>
        <input
          :value="item.harga * item.qty"
          type="number"
          class="border p-2 w-32"
          readonly
        />
      </div>

      <!-- Tombol hapus item -->
      <div class="flex items-end">
        <button
          type="button"
          @click="removeItem(i)"
          class="bg-red-500 text-white px-2 py-1 rounded"
          title="Hapus Item"
        >
          x
        </button>
      </div>
    </div>

    <!-- Tambah item -->
    <button
      type="button"
      @click="addItem"
      class="bg-gray-500 text-white px-3 py-1 rounded"
    >
      Tambah Item
    </button>

    <!-- Total Keseluruhan -->
    <div class="mt-4 font-semibold text-right">
      Total Sales Order: Rp {{ totalOrder.toLocaleString() }}
    </div>

    <!-- Simpan -->
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Simpan
    </button>

  </form>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createSalesOrder } from '@/services/salesOrder.service'
import api from '@/services/api'

const props = defineProps({
  editData: Object
})

const router = useRouter()
const customers = ref([])
const mobils = ref([])

const form = ref({
  nomor: '',
  customerId: '',
  createdById: 1,
  items: []
})

// Tambah item baru
const addItem = () => {
  form.value.items.push({
    mobilId: '',
    qty: 1,
    harga: 0
  })
}

// Hapus item
const removeItem = (index) => {
  form.value.items.splice(index, 1)
}

// Set harga unit saat pilih mobil
const setHargaItem = (item) => {
  const mobil = mobils.value.find(m => m.id === item.mobilId)
  item.harga = mobil ? mobil.harga : 0
}

// Update total item (reactive, minimal 1)
const updateTotalItem = (item) => {
  if (item.qty < 1) item.qty = 1
}

// Total keseluruhan Sales Order
const totalOrder = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.harga * item.qty), 0)
})

// Submit form
const submit = async () => {
  try {
    // generate nomor otomatis jika baru
    if (!form.value.nomor) {
      form.value.nomor = `SO-${Date.now()}`
    }

    await createSalesOrder(form.value)
    router.push('/admin/sales-order')
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan Sales Order: ' + err.message)
  }
}

// Load data master
onMounted(async () => {
  try {
    const resCustomer = await api.get('/admin/customers')
    customers.value = resCustomer.data

    const resMobil = await api.get('/mobil')
    mobils.value = resMobil.data

    if (props.editData) {
      form.value.nomor = props.editData.nomor
      form.value.customerId = props.editData.customerId
      form.value.items = props.editData.detail.map(d => ({
        mobilId: d.mobilId,
        qty: d.qty,
        harga: d.harga
      }))
    } else {
      addItem()
    }
  } catch (err) {
    console.error(err)
    alert('Gagal memuat data Customer atau Mobil')
  }
})
</script>
