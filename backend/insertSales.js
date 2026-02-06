const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function insertSales(nama_sales, email, passwordPlain, role) {
  try {
    // cek email dulu
    const existing = await prisma.sales.findUnique({ where: { email } });
    if (existing) {
      console.log(`❌ Email "${email}" sudah ada di database!`);
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    // insert data baru
    const sales = await prisma.sales.create({
      data: {
        nama_sales: nama_sales,
        email: email,
        password: hashedPassword,
        role: role,  // wajib sesuai schema
      },
    });

    console.log(`✅ Sales "${sales.nama_sales}" berhasil ditambahkan dengan role "${sales.role}"!`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

// =====================
// Ganti data sesuai kebutuhan
insertSales('Jean Sasi', 'jean@example.com', 'rahasia123', 'sales');
