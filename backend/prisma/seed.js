const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ===== USER INTERNAL =====
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@showroom.com' },
    update: {},
    create: {
      name: 'Admin Showroom',
      email: 'admin@showroom.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const ownerPassword = await bcrypt.hash('owner123', 10);
  await prisma.user.upsert({
    where: { email: 'owner@showroom.com' },
    update: {},
    create: {
      name: 'Owner Showroom',
      email: 'owner@showroom.com',
      password: ownerPassword,
      role: 'OWNER',
    },
  });

  const salesPassword = await bcrypt.hash('sales123', 10);
  await prisma.user.upsert({
    where: { email: 'sales@showroom.com' },
    update: {},
    create: {
      name: 'Sales 1',
      email: 'sales@showroom.com',
      password: salesPassword,
      role: 'SALES',
    },
  });

  // ===== CUSTOMER DEFAULT =====
  const customerPassword = await bcrypt.hash('customer123', 10);
  await prisma.customer.upsert({
    where: { email: 'customer1@example.com' },
    update: {},
    create: {
      nama: 'Customer 1',
      email: 'customer1@example.com',
      password: customerPassword,
      noTelp: '081234567890',
      alamat: 'Jl. Contoh No.1',
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
