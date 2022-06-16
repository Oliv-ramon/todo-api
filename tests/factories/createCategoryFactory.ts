import categoryService from "../../src/services/categoryService";
import categoryFactory from "./categoryFactory";

export default async function createCategoryFactory(userId: number) {
  const category = categoryFactory({ id: 1, userId });
  await categoryService.create(category, userId);

  return category;
}
