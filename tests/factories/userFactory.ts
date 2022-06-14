import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";

interface Params {
  id?: number;
}

export default function userFactory(params?: Params) {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.userName(),
    ...params,
  } as User;
}
