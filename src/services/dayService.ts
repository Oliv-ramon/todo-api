import dayRepository from "../repositories/dayRepository";

async function getAll() {
  return dayRepository.findAll();
}

const dayService = {
  getAll,
};

export default dayService;
