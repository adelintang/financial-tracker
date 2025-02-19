import { Currency, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { users } from './data';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: `user-${uuidv4()}`,
        email: users[0].email,
        name: users[0].name,
        password: await bcrypt.hash(users[0].password, 10),
        currency: Currency.IDR,
        role: Role.ADMIN,
      },
      {
        id: `user-${uuidv4()}`,
        email: users[1].email,
        name: users[1].name,
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
