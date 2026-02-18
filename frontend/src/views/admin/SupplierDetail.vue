<template>
  <div>

    <h1 class="text-xl font-bold mb-4">
      Detail Supplier: {{ supplier.nama }}
    </h1>


    <!-- INFO SUPPLIER -->
    <div class="mb-6">

      <p><b>No Telp:</b> {{ supplier.noTelp }}</p>

      <p><b>Alamat:</b> {{ supplier.alamat }}</p>

    </div>


    <!-- TABLE PEMBELIAN -->
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


  // ================= FORMAT DATA PEMBELIAN =================
  pembelian.value =
    data.purchaseOrders?.flatMap(po =>

      po.goodsReceipts?.flatMap(gr =>

        gr.invoice?.items?.map(item => ({

          namaMobil:
            item.mobil.nama +
            " - " +
            item.mobil.merk +
            " " +
            item.mobil.tipe,

          qty: item.qty,

          tanggal:
            new Date(gr.invoice.tanggal)
              .toLocaleDateString('id-ID')

        })) || []

      ) || []

    ) || []

})

</script>
