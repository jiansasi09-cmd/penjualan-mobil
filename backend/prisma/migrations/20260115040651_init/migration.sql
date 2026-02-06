-- CreateTable
CREATE TABLE "Mobil" (
    "id" TEXT NOT NULL,
    "nama_mobil" TEXT NOT NULL,
    "merk" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "warna" TEXT NOT NULL,
    "harga_beli" DOUBLE PRECISION NOT NULL,
    "harga_jual" DOUBLE PRECISION NOT NULL,
    "stok" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mobil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "nama_sales" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penjualan" (
    "id" TEXT NOT NULL,
    "tanggal_transaksi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qty" INTEGER NOT NULL,
    "harga_satuan" DOUBLE PRECISION NOT NULL,
    "total_harga" DOUBLE PRECISION NOT NULL,
    "metode_pembayaran" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mobil_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "sales_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Penjualan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sales_email_key" ON "Sales"("email");

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_mobil_id_fkey" FOREIGN KEY ("mobil_id") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
