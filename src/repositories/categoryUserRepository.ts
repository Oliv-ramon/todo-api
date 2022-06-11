import { CategoryUser } from "@prisma/client";
import { prisma } from "../database.js";

type CreateCategoryUserData = Omit<CategoryUser, "id">;

function insert(categoryData: CreateCategoryUserData) {
  return prisma.categoryUser.create({
    data: categoryData,
  });
}

function getByNameAndUserId(userId: number, name: string) {
  return prisma.categoryUser.findFirst({
    where: {
      userId,
      category: {
        name,
      },
    },
    select: {
      category: true,
    },
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE "categoriesUsers" RESTART IDENTITY CASCADE`;
}

const categoryUserRepository = {
  getByNameAndUserId,
  insert,
  truncate,
};

export default categoryUserRepository;
