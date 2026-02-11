-- CreateEnum
CREATE TYPE "MutationType" AS ENUM ('IN', 'OUT', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "StockMutation" (
    "id" SERIAL NOT NULL,
    "mobilId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "type" "MutationType" NOT NULL,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMutation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockMutation" ADD CONSTRAINT "StockMutation_mobilId_fkey" FOREIGN KEY ("mobilId") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
