import faker from "@faker-js/faker";
import { Event } from "@prisma/client";

type Params = Partial<Event>;

export default function eventFactory(params?: Params): Event {
  return {
    id: Number(faker.random.numeric()),
    taskId: Number(faker.random.numeric()),
    userId: Number(faker.random.numeric()),
    weekDayId: Number(faker.random.numeric()),
    date: faker.date.future(),
    checked: false,
    ...params,
  };
}
