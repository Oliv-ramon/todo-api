import { WeekDay } from "@prisma/client";
import weekDayRepository from "../repositories/weekDayRepository.js";
import { badRequestError } from "../utils/errorUtils.js";

async function getAll() {
  return weekDayRepository.findAll();
}

async function validateWeekDaysExistence(weekDays: WeekDay[]) {
  const storedDays = await getAll();

  weekDays.forEach((day) => {
    const isIncluded = storedDays.some((storedDay) => storedDay.id === day.id);

    if (!isIncluded) {
      throw badRequestError("weekDays must to include valid days");
    }
  });
}

const weekDayService = {
  getAll,
  validateWeekDaysExistence,
};

export default weekDayService;
