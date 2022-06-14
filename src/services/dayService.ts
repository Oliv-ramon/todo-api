import { Day } from "@prisma/client";
import dayRepository from "../repositories/dayRepository.js";
import { badRequestError } from "../utils/errorUtils.js";

async function getAll() {
  return dayRepository.findAll();
}

async function validateDaysExistence(days: Day[]) {
  const storedDays = await getAll();

  days.forEach((day) => {
    const isIncluded = storedDays.some((storedDay) => storedDay.id === day.id);

    if (!isIncluded) {
      throw badRequestError("days property must to include valid days");
    }
  });
}

const dayService = {
  getAll,
  validateDaysExistence,
};

export default dayService;
