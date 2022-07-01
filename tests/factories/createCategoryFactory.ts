import { Category } from "@prisma/client";
import { prisma } from "../../src/database";
import categoryService from "../../src/services/categoryService";
import categoryFactory from "./categoryFactory";

export default async function createCategoryFactory(
  userId: number,
  amount?: number
) {
  if (amount > 1) {
    const categories: Category[] = [];

    for (let i = 1; i <= amount; i++) {
      const category = categoryFactory({ id: i, userId });
      categories.push(category);
    }

    await prisma.category.createMany({ data: categories });
    return categories;
  }

  const category = categoryFactory({ id: 1, userId });
  await categoryService.create(category, userId);

  return category;
}
