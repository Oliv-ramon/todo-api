import { faker } from "@faker-js/faker";
import { Category } from "@prisma/client";

interface Params {
  id?: number;
}

export default function categoryFactory(params?: Params) {
  return {
    name: faker.word.noun(),
    color: faker.internet.color(),
    icon: faker.word.noun(),
    ...params,
  } as Category;
}
