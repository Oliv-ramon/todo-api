import { PrismaClient } from "@prisma/client";
import { weekDays } from "./entities/weekDays.js";
const prisma = new PrismaClient();

async function main() {
  await createDays();
}

async function createDays() {
  await prisma.weekDay.createMany({
    data: weekDays,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
