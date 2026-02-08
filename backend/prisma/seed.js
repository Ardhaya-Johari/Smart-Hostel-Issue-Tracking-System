const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Users
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: hashedPassword,
      role: 'STUDENT',
      name: 'John Doe',
      hostel: 'A',
      block: '1',
      room: '101',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin User',
    },
  });

  // Sample Issue
  await prisma.issue.create({
    data: {
      title: 'Leaky faucet',
      description: 'Faucet in room 101 is leaking.',
      category: 'PLUMBING',
      priority: 'MEDIUM',
      hostel: 'A',
      block: '1',
      room: '101',
      reporterId: student.id,
    },
  });

  // Sample LostAndFound
  await prisma.lostAndFound.create({
    data: {
      itemName: 'Wallet',
      description: 'Black leather wallet lost in hostel A.',
      location: 'Hostel A, Block 1',
      date: new Date(),
      status: 'OPEN',
      reporterId: student.id,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
