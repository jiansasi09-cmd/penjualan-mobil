-- CreateTable
CREATE TABLE "PembelianMobil" (
    "id" TEXT NOT NULL,
    "mobil_id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga_beli" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PembelianMobil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PembelianMobil" ADD CONSTRAINT "PembelianMobil_mobil_id_fkey" FOREIGN KEY ("mobil_id") REFERENCES "Mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
