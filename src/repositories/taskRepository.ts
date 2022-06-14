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

function getByName(name: string) {
  return prisma.task.findFirst({
    where: {
      category: {
        tasks: {
          some: {
            name,
          },
        },
      },
    },
  });
}

const taskRepository = { insert, getByName };

export default taskRepository;
