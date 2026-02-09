/*
  Warnings:

  - The values [AKTIF] on the enum `POStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[kode]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[purchaseRequestId]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseRequestId` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `PurchaseOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "POStatus_new" AS ENUM ('DRAFT', 'DIKIRIM', 'DITERIMA', 'SELESAI', 'DIBATALKAN');
ALTER TABLE "PurchaseOrder" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "PurchaseOrder" ALTER COLUMN "status" TYPE "POStatus_new" USING ("status"::text::"POStatus_new");
ALTER TYPE "POStatus" RENAME TO "POStatus_old";
ALTER TYPE "POStatus_new" RENAME TO "POStatus";
DROP TYPE "POStatus_old";
ALTER TABLE "PurchaseOrder" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "purchaseRequestId" INTEGER NOT NULL,
ADD COLUMN     "supplierId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "PurchaseOrderItem" ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_kode_key" ON "PurchaseOrder"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_purchaseRequestId_key" ON "PurchaseOrder"("purchaseRequestId");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES "purchase_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
