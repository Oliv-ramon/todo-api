import dayjs from "dayjs";
import { formatDate } from "./taskServiceUtils.js";

export function getWeekDayDate(weekDayId: number, daysToJump: number) {
  return dayjs()
    .day(weekDayId + daysToJump)
    .subtract(3, "hours")
    .toISOString();
}

export function getNextDayDateFormated(date: Date) {
  return formatDate(dayjs(date).add(1, "day").toISOString());
}
