import { Category } from "@prisma/client";
import { prisma } from "../database.js";

export type CategoryData = Omit<Category, "id" | "user">;

function insert(categoryData: CategoryData) {
  return prisma.category.create({
    data: categoryData,
  });
}

function getByNameAndUserId(userId: number, name: string) {
  return prisma.category.findFirst({
    where: {
      userId,
      name,
    },
  });
}

async function truncate() {
  await prisma.category.deleteMany();
}

const categoryRepository = {
  getByNameAndUserId,
  insert,
  truncate,
};

export default categoryRepository;
