-- CreateEnum
CREATE TYPE "StatusPenjualan" AS ENUM ('UNPAID', 'PARTIAL', 'PAID');

-- AlterTable
ALTER TABLE "Pembayaran" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Penjualan" ADD COLUMN     "status" "StatusPenjualan" NOT NULL DEFAULT 'UNPAID';

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
