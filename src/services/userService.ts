import userRepository, { UserData } from "../repositories/userRepository.js";
import { conflictError } from "../utils/errorUtils.js";
import bcrypt from "bcrypt";

async function signUp(userData: UserData) {
  await validateDuplicateUser(userData.email);

  return userRepository.create({
    ...userData,
    password: bcrypt.hashSync(userData.password, 12),
  });
}

async function validateDuplicateUser(email: string) {
  const existingUser = await userRepository.getByEmail(email);

  if (existingUser) {
    throw conflictError("this user already have an account");
  }
}

const userService = {
  signUp,
};

export default userService;
