import userRepository, { UserData } from "../repositories/userRepository";
import { conflictError } from "../utils/errorUtils";

async function signUp(userData: UserData) {
  await validateDuplicateUser(userData.email);

  return userRepository.create(userData);
}

async function validateDuplicateUser(email: string) {
  const existingUser = await userRepository.getByEmail(email);

  if (existingUser) {
    throw conflictError("this user is already have an account");
  }
}

const userService = {
  signUp,
};

export default userService;
