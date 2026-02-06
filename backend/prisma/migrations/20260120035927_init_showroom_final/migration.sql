/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `no_telp` on the `Customer` table. All the data in the column will be lost.
  - The `id` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Mobil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Mobil` table. All the data in the column will be lost.
  - You are about to drop the column `harga_beli` on the `Mobil` table. All the data in the column will be lost.
  - You are about to drop the column `harga_jual` on the `Mobil` table. All the data in the column will be lost.
  - You are about to drop the column `nama_mobil` on the `Mobil` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Mobil` table. All the data in the column will be lost.
  - The `id` column on the `Mobil` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Penjualan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `harga_satuan` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `metode_pembayaran` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `mobil_id` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `sales_id` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_transaksi` on the `Penjualan` table. All the data in the column will be lost.
  - You are about to drop the column `total_harga` on the `Penjualan` table. All the data in the column will be lost.
  - The `id` column on the `Penjualan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `nama_sales` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Sales` table. All the data in the column will be lost.
  - The `id` column on the `Sales` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `PembelianMobil` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noTelp` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga` to the `Mobil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Mobil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Mobil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesId` to the `Penjualan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Penjualan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noTelp` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SALES', 'OWNER');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'DONE');

-- CreateEnum
CREATE TYPE "StatusPesanan" AS ENUM ('MENUNGGU_KONFIRMASI', 'DIPROSES', 'SELESAI', 'DIBATALKAN');

-- CreateEnum
CREATE TYPE "MetodeBayar" AS ENUM ('CASH', 'TRANSFER', 'KREDIT');

-- CreateEnum
CREATE TYPE "StatusBayar" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "PembelianMobil" DROP CONSTRAINT "PembelianMobil_mobil_id_fkey";

-- DropForeignKey
ALTER TABLE "Penjualan" DROP CONSTRAINT "Penjualan_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Penjualan" DROP CONSTRAINT "Penjualan_mobil_id_fkey";

-- DropForeignKey
ALTER TABLE "Penjualan" DROP CONSTRAINT "Penjualan_sales_id_fkey";

-- DropIndex
DROP INDEX "Sales_email_key";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "created_at",
DROP COLUMN "no_telp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "noTelp" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "alamat" DROP NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Mobil" DROP CONSTRAINT "Mobil_pkey",
DROP COLUMN "created_at",
DROP COLUMN "harga_beli",
DROP COLUMN "harga_jual",
DROP COLUMN "nama_mobil",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "harga" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "stok" SET DEFAULT 0,
ADD CONSTRAINT "Mobil_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Penjualan" DROP CONSTRAINT "Penjualan_pkey",
DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "harga_satuan",
DROP COLUMN "metode_pembayaran",
DROP COLUMN "mobil_id",
DROP COLUMN "qty",
DROP COLUMN "sales_id",
DROP COLUMN "status",
DROP COLUMN "tanggal_transaksi",
DROP COLUMN "total_harga",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "salesId" INTEGER NOT NULL,
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Penjualan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
DROP COLUMN "created_at",
DROP COLUMN "email",
DROP COLUMN "nama_sales",
DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "noTelp" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "PembelianMobil";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "noTelp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorit" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,

    CONSTRAINT "Favorit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pesanan" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "hargaDeal" DOUBLE PRECISION NOT NULL,
    "status" "StatusPesanan" NOT NULL DEFAULT 'MENUNGGU_KONFIRMASI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PembayaranCustomer" (
    "id" SERIAL NOT NULL,
    "pesananId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "metode" "MetodeBayar" NOT NULL,
    "bukti" TEXT,
    "status" "StatusBayar" NOT NULL DEFAULT 'PENDING',
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PembayaranCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPenjualan" (
    "id" SERIAL NOT NULL,
    "penjualanId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetailPenjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPembelian" (
    "id" SERIAL NOT NULL,
    "pembelianId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetailPembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id" SERIAL NOT NULL,
    "penjualanId" INTEGER NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "metode" "MetodeBayar" NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Favorit_customerId_mobilId_key" ON "Favorit"("customerId", "mobilId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Favorit" ADD CONSTRAINT "Favorit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorit" ADD CONSTRAINT "Favorit_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembayaranCustomer" ADD CONSTRAINT "PembayaranCustomer_pesananId_fkey" FOREIGN KEY ("pesananId") REFERENCES "Pesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembayaranCustomer" ADD CONSTRAINT "PembayaranCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPenjualan" ADD CONSTRAINT "DetailPenjualan_penjualanId_fkey" FOREIGN KEY ("penjualanId") REFERENCES "Penjualan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPenjualan" ADD CONSTRAINT "DetailPenjualan_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembelian" ADD CONSTRAINT "Pembelian_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPembelian" ADD CONSTRAINT "DetailPembelian_pembelianId_fkey" FOREIGN KEY ("pembelianId") REFERENCES "Pembelian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPembelian" ADD CONSTRAINT "DetailPembelian_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_penjualanId_fkey" FOREIGN KEY ("penjualanId") REFERENCES "Penjualan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
