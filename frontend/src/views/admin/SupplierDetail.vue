<template>
  <div>
    <h1 class="text-xl font-bold mb-4">
      Detail Supplier: {{ supplier.nama }}
    </h1>

    <div class="mb-6">
      <p><b>No Telp:</b> {{ supplier.noTelp }}</p>
      <p><b>Alamat:</b> {{ supplier.alamat }}</p>
    </div>

    <BaseTable
      :headers="['Nama Mobil', 'Jumlah', 'Tanggal']"
      :keys="['namaMobil', 'qty', 'tanggal']"
      :data="pembelian"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseTable from '@/components/common/BaseTable.vue'
import { getSupplierById } from '@/services/supplier.service'

const route = useRoute()
const supplier = ref({})
const pembelian = ref([])

onMounted(async () => {
  const data = await getSupplierById(route.params.id)
  supplier.value = data

  pembelian.value =
    data.pembelian?.flatMap(p =>
      p.detail.map(d => ({
        namaMobil: d.mobil.nama,
        qty: d.qty,
        tanggal: new Date(p.tanggal).toLocaleDateString('id-ID')
      }))
    ) || []
})
</script>
