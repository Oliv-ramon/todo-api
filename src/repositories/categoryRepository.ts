import { Category } from "@prisma/client";
import { prisma } from "../database";

export type CategoryData = Omit<Category, "id" | "user">;

function insert(categoryData: CategoryData) {
  return prisma.category.create({
    data: categoryData,
  });
}

function getByName(name: string) {
  return prisma.category.findUnique({
    where: {
      name,
    },
  });
}

const categoryRepository = {
  getByName,
  insert,
};

export default categoryRepository;
