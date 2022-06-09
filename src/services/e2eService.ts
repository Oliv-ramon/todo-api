import categoryRepository from "../repositories/categoryRepository.js";
import userRepository from "../repositories/userRepository.js";

async function truncate() {
  await categoryRepository.truncate();
  await userRepository.truncate();
}

const e2eService = {
  truncate,
};

export default e2eService;
