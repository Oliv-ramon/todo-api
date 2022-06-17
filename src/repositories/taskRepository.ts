import { Day, Task } from "@prisma/client";
import { prisma } from "../database.js";

export type CreateTaksData = Omit<Task, "id"> & { days: Day[] };

function insert(createTaskData: CreateTaksData) {
  return prisma.task.create({
    data: {
      name: createTaskData.name,
      categoryId: createTaskData.categoryId,
      days: {
        connect: createTaskData.days.map((day) => ({
          id: day.id,
        })),
      },
    },
  });
}

function getByNameAndUserId(name: string, userId: number) {
  return prisma.task.findFirst({
    where: {
      name,
      category: {
        userId,
      },
    },
  });
}

function truncate() {
  return prisma.$executeRaw`TRUNCATE tasks RESTART IDENTITY CASCADE`;
}

const taskRepository = { insert, getByNameAndUserId, truncate };

export default taskRepository;
