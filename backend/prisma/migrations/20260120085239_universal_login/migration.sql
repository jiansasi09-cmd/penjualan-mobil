-- AlterTable
ALTER TABLE "PembayaranCustomer" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Penjualan" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "PembayaranCustomer" ADD CONSTRAINT "PembayaranCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
