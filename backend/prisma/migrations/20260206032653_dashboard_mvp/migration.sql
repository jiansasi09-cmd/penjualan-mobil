/*
  Warnings:

  - The values [PENJUALAN,PEMBELIAN,BOOKING,PESANAN,PEMBAYARAN] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('BELUM_LUNAS', 'LUNAS');

-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('PURCHASING', 'SALES', 'INVENTORY', 'SYSTEM');
ALTER TABLE "ActivityLog" ALTER COLUMN "type" TYPE "ActivityType_new" USING ("type"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "ActivityType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "POStatus" ADD VALUE 'DIBATALKAN';

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PurchaseRequest" ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "PurchaseRequestItem" (
    "id" SERIAL NOT NULL,
    "prId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "PurchaseRequestItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" SERIAL NOT NULL,
    "poId" INTEGER NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "poId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'BELUM_LUNAS',
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseRequestItem" ADD CONSTRAINT "PurchaseRequestItem_prId_fkey" FOREIGN KEY ("prId") REFERENCES "PurchaseRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequestItem" ADD CONSTRAINT "PurchaseRequestItem_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_poId_fkey" FOREIGN KEY ("poId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_poId_fkey" FOREIGN KEY ("poId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
