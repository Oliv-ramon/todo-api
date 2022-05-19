import { faker } from "@faker-js/faker";

export default function userFactory() {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.userName(),
  };
}
