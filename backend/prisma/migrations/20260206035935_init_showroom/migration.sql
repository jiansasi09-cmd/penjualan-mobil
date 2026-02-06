/*
  Warnings:

  - Added the required column `bahan_bakar` to the `Mobil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kilometer` to the `Mobil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmisi` to the `Mobil` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Transmisi" AS ENUM ('Manual', 'Automatic');

-- CreateEnum
CREATE TYPE "BahanBakar" AS ENUM ('Bensin', 'Diesel', 'Hybrid', 'Listrik');

-- CreateEnum
CREATE TYPE "StatusMobil" AS ENUM ('READY', 'BOOKED', 'TERJUAL');

-- AlterTable
ALTER TABLE "Mobil" ADD COLUMN     "bahan_bakar" "BahanBakar" NOT NULL,
ADD COLUMN     "kilometer" INTEGER NOT NULL,
ADD COLUMN     "status" "StatusMobil" NOT NULL DEFAULT 'READY',
ADD COLUMN     "transmisi" "Transmisi" NOT NULL;
