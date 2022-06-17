import { faker } from "@faker-js/faker";
import { Day, Task } from "@prisma/client";
import { CreateTaksData } from "../../src/repositories/taskRepository";

type Params = Partial<Task> & { categoryId: number; days?: Day[] };

export default function taskFactory(params: Params) {
  const days: Day[] = [{ id: 1, name: "sunday" }];

  return {
    name: faker.word.noun(),
    categoryId: params.categoryId,
    days,
    ...params,
  } as Task & CreateTaksData;
}
