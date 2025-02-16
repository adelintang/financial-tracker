import { Currency, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('akounpes12', 10);
  const user = {
    email: 'akounpes12@gmail.com',
    name: 'Akoun Pes',
    password: passwordHash,
    currency: Currency.IDR,
    role: Role.ADMIN,
  };

  const existingAdmin = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: user,
    });
    console.log(admin);
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
