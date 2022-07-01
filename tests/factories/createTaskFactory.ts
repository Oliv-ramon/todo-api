import { Prisma, Task } from "@prisma/client";
import dayjs from "dayjs";
import { prisma } from "../../src/database";
import taskFactory from "./taskFactory";

type TaskParams = Partial<Task>;
type EventParams = Partial<Prisma.EventCreateInput>;

export default async function createTaskFactory(
  userId: number,
  categoryId: number,
  taskParams?: TaskParams,
  eventParams?: EventParams
) {
  const task = taskFactory({ categoryId, ...taskParams });
  const todayDate = dayjs().toDate();

  const events: Prisma.EventCreateManyTaskInput[] = task.weekDays.map((w) => ({
    userId,
    weekDayId: w.id,
    date: todayDate,
    ...eventParams,
  }));
  delete task.times;
  delete task.weekDays;

  return prisma.task.create({
    data: { ...(task as Task), events: { createMany: { data: events } } },
  });
}
