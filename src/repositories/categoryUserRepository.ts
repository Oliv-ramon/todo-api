import { CategoryUser } from "@prisma/client";
import { prisma } from "../database.js";

type CreateCategoryUserData = Omit<CategoryUser, "id">;

function insert(categoryData: CreateCategoryUserData) {
  return prisma.categoryUser.create({
    data: categoryData,
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE "categoriesUsers" RESTART IDENTITY CASCADE`;
}

const categoryUserRepository = {
  insert,
  truncate,
};

export default categoryUserRepository;
