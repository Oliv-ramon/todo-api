import faker from "@faker-js/faker";

export default function userFactory() {
  console.log(faker);
  console.log(faker.internet);
  console.log(faker.internet.email);
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}
