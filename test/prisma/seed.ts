import { Currency, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const users = [
  {
    email: 'akounpes12@gmail.com',
    password: 'akounpes12',
  },
  {
    email: 'jonathan@gmail.com',
    password: 'jonathan123',
  },
];

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: `user-${uuidv4()}`,
        email: users[0].email,
        name: 'Akoun Pes',
        password: await bcrypt.hash(users[0].password, 10),
        currency: Currency.IDR,
        role: Role.ADMIN,
      },
      {
        id: `user-${uuidv4()}`,
        email: users[1].email,
        name: 'Jonathan',
        password: await bcrypt.hash(users[1].password, 10),
        currency: Currency.IDR,
        role: Role.USER,
      },
    ],
    skipDuplicates: true,
  });
  console.log('users test seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
