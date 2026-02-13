/*
  Warnings:

  - A unique constraint covering the columns `[nomor]` on the table `Penjualan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[salesOrderId]` on the table `Penjualan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomor` to the `Penjualan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesOrderId` to the `Penjualan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SalesOrderStatus" AS ENUM ('DRAFT', 'APPROVED', 'CANCELLED', 'SELESAI');

-- AlterTable
ALTER TABLE "Penjualan" ADD COLUMN     "nomor" TEXT NOT NULL,
ADD COLUMN     "salesOrderId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SalesOrder" (
    "id" SERIAL NOT NULL,
    "nomor" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SalesOrderStatus" NOT NULL DEFAULT 'DRAFT',
    "total" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailSalesOrder" (
    "id" SERIAL NOT NULL,
    "salesOrderId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetailSalesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalesOrder_nomor_key" ON "SalesOrder"("nomor");

-- CreateIndex
CREATE UNIQUE INDEX "Penjualan_nomor_key" ON "Penjualan"("nomor");

-- CreateIndex
CREATE UNIQUE INDEX "Penjualan_salesOrderId_key" ON "Penjualan"("salesOrderId");

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailSalesOrder" ADD CONSTRAINT "DetailSalesOrder_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailSalesOrder" ADD CONSTRAINT "DetailSalesOrder_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
