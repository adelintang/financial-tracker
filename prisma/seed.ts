import { Currency, PrismaClient, Role, TransactionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const investmentTypes = [
  { id: 1, type: 'Saham' },
  { id: 2, type: 'Obligasi' },
  { id: 3, type: 'Reksa Dana' },
  { id: 4, type: 'Properti' },
  { id: 5, type: 'Emas' },
  { id: 6, type: 'Deposito' },
  { id: 7, type: 'Peer-to-Peer Lending' },
  { id: 8, type: 'Cryptocurrency' },
];

const categories = [
  { id: 1, name: 'Makanan', type: TransactionType.EXPENSE },
  { id: 2, name: 'Minuman', type: TransactionType.EXPENSE },
  { id: 3, name: 'Transportasi', type: TransactionType.EXPENSE },
  { id: 4, name: 'Hiburan', type: TransactionType.EXPENSE },
  { id: 5, name: 'Pakaian', type: TransactionType.EXPENSE },
  { id: 6, name: 'Kesehatan', type: TransactionType.EXPENSE },
  { id: 7, name: 'Gaji', type: TransactionType.INCOME },
  { id: 8, name: 'Bonus', type: TransactionType.INCOME },
  { id: 9, name: 'Hadiah', type: TransactionType.INCOME },
  { id: 10, name: 'Hasil Usaha', type: TransactionType.INCOME },
];

async function main() {
  const passwordHash = await bcrypt.hash('akounpes12', 10);
  const user = {
    id: `user-${uuidv4()}`,
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

  await prisma.investmentType.createMany({ data: investmentTypes });
  console.log('Investment types created');
  await prisma.category.createMany({ data: categories });
  console.log('Categories created');
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
