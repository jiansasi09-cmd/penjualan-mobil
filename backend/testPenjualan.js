const axios = require('axios');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const backendURL = 'http://localhost:3000/api';

async function main() {
  try {
    // ===== 1️⃣ Tambah user Sales =====
    const email = 'jean@example.com';
    const passwordPlain = 'rahasia123';
    const nama_sales = 'Jean Sasi';
    const role = 'sales';

    // Cek dulu apakah user sudah ada
    let existingUser = await prisma.sales.findUnique({ where: { email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(passwordPlain, 10);
      existingUser = await prisma.sales.create({
        data: {
          nama_sales,
          email,
          password: hashedPassword,
          role,
        },
      });
      console.log(`✅ User "${email}" berhasil ditambahkan.`);
    } else {
      console.log(`ℹ️ User "${email}" sudah ada di database.`);
    }

    // ===== 2️⃣ Login user =====
    const loginRes = await axios.post(`${backendURL}/auth/login`, {
      email,
      password: passwordPlain,
    });

    const token = loginRes.data.token;
    console.log(`✅ Login berhasil, token diterima.`);

    // ===== 3️⃣ GET /penjualan =====
    const penjualanRes = await axios.get(`${backendURL}/penjualan`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('✅ Data penjualan:');
    console.log(JSON.stringify(penjualanRes.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('❌ Error response:', err.response.data);
    } else {
      console.error('❌ Error:', err.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
