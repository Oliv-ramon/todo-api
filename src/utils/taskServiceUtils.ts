import dayjs from "dayjs";
import { GetOfTodayQueries } from "../services/taskService";

export function formatDate(date: string) {
  const formatedString = date.split("T")[0] + "T00:00:00.000Z";
  return dayjs(formatedString).toDate();
}

export function parseQueries(queries: GetOfTodayQueries) {
  for (const key in queries) {
    queries[key] = JSON.parse(queries[key]);
  }
}
