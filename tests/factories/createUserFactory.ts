import bcrypt from "bcrypt";
import userRepository, {
  UserData,
} from "../../src/repositories/userRepository";

export default async function createUserFactory(userData: UserData) {
  return userRepository.insert({
    ...userData,
    password: bcrypt.hashSync(userData.password, 12),
  });
}
