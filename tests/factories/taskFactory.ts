import { faker } from "@faker-js/faker";
import { Day, Task } from "@prisma/client";
import { CreateTaksData } from "../../src/repositories/taskRepository";
import daysFactory from "./daysFactory";

type Params = Partial<Task> & { categoryId: number; days?: Day[] };

export default function taskFactory(params: Params) {
  const days: Day[] = daysFactory();

  return {
    name: faker.word.noun(),
    categoryId: params.categoryId,
    days,
    ...params,
  } as Task & CreateTaksData;
}
