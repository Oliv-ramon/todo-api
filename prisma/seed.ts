import { days } from "./entities/days.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await createDays();
}

async function createDays() {
  days.forEach(async (day) => {
    await prisma.day.upsert({
      where: {
        id: day.id,
      },
      create: day,
      update: day,
    });
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
