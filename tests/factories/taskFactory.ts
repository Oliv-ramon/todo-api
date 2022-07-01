import { faker } from "@faker-js/faker";
import { Task, WeekDay } from "@prisma/client";
import { CreateTaksData } from "../../src/repositories/taskRepository";
import weekDaysFactory from "./weekDaysFactory";

type Params = Partial<Task> & { categoryId: number; weekDays?: WeekDay[] };

export default function taskFactory(params: Params) {
  const weekDays = weekDaysFactory(); //test
  const times = 1;

  return {
    name: faker.word.noun(),
    categoryId: params.categoryId,
    weekDays,
    times,
    ...params,
  } as Task & CreateTaksData;
}
