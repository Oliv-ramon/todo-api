import { Category } from "@prisma/client";
import { prisma } from "../database.js";

export type CreateCategoryData = Omit<Category, "id" | "user">;

function insert(categoryData: CreateCategoryData) {
  return prisma.category.create({
    data: categoryData,
  });
}

function getById(categoryId: number) {
  return prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
}

function getByNameAndUserId(userId: number, name: string) {
  return prisma.category.findFirst({
    where: {
      name,
      userId,
    },
  });
}

function getByUserId(userId: number) {
  return prisma.category.findMany({
    where: {
      userId,
    },
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE categories RESTART IDENTITY CASCADE`;
}

const categoryRepository = {
  insert,
  getById,
  getByNameAndUserId,
  getByUserId,
  truncate,
};

export default categoryRepository;
