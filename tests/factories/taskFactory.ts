import { faker } from "@faker-js/faker";
import { Task } from "@prisma/client";
import createCategoryFactory from "./createCategoryFactory";

interface Params {
  id?: number;
}

export default async function taskFactory(params: Params) {
  const category = await createCategoryFactory();

  return {
    name: faker.word.noun(),
    categoryId: category.id,
    ...params,
  } as Task;
}
