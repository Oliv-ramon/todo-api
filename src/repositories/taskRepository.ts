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

function getByNameAndCategoryId(categoryId: number, name: string) {
  return prisma.task.findFirst({
    where: {
      name,
      categoryId,
    },
  });
}

const taskRepository = { insert, getByNameAndCategoryId };

export default taskRepository;
