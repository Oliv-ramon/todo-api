import bcrypt from "bcrypt";

import userRepository from "../../src/repositories/userRepository";
import userService from "../../src/services/userService";
import userFactory from "./userFactory";

export default async function authFactory() {
  const user = userFactory();
  await userRepository.insert({
    ...user,
    password: bcrypt.hashSync(user.password, 12),
  });
  delete user.name;

  return userService.login(user);
}
