import categoryRepository from "../src/repositories/categoryRepository";
import taskRepository from "../src/repositories/taskRepository";
import userRepository from "../src/repositories/userRepository";

export async function cleanDb() {
  await userRepository.truncate();
  await categoryRepository.truncate();
  await taskRepository.truncate();
}
