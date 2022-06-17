import userService from "../../src/services/userService";
import createUserFactory from "./createUserFactory";
import userFactory from "./userFactory";

export default async function authFactory() {
  const user = userFactory();
  await createUserFactory(user);
  delete user.name;

  return userService.login(user);
}
