import { faker } from "@faker-js/faker";

export default function categoryFactory() {
  return {
    name: faker.word.noun(),
    color: faker.internet.color(),
    icon: faker.internet.avatar(),
  };
}
