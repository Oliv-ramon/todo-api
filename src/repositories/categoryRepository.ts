import { Category } from "@prisma/client";
import { prisma } from "../database";

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

const categoryRepository = {
  getByNameAndUserId,
  insert,
};

export default categoryRepository;
