import userRepository from "../repositories/userRepository.js";

async function truncate() {
  return userRepository.truncate();
}

const e2eService = {
  truncate,
};

export default e2eService;
