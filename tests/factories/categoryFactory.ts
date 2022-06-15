import { faker } from "@faker-js/faker";
import { Category } from "@prisma/client";

type Params = Partial<Category>;

export default function categoryFactory(params?: Params) {
  return {
    name: faker.word.noun(),
    color: faker.internet.color(),
    icon: faker.word.noun(),
    ...params,
  } as Category;
}
