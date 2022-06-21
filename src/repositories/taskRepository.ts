import { Day, Prisma } from "@prisma/client";
import { prisma } from "../database.js";
import { GetOfTodayQueries } from "../services/taskService.js";

export type CreateTaksData = Prisma.TaskCreateInput & {
  categoryId: number;
  days: Day[];
};

export type UpdateTaskData = Prisma.TaskUpdateInput;

function insert(createTaskData: CreateTaksData) {
  return prisma.task.create({
    data: {
      name: createTaskData.name,
      category: {
        connect: { id: createTaskData.categoryId },
      },
      days: {
        connect: createTaskData.days.map((day) => ({
          id: day.id,
        })),
      },
    },
  });
}

function getById(taskId: number) {
  return prisma.task.findUnique({ where: { id: taskId } });
}

function getOfToday(todayWeekDayId: number, queries?: GetOfTodayQueries) {
  return prisma.task.findMany({
    where: {
      days: {
        some: {
          id: todayWeekDayId,
        },
      },
      ...queries,
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

function update(taskId: number, taskUpdateData: UpdateTaskData) {
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: taskUpdateData,
  });
}

function truncate() {
  return prisma.$executeRaw`TRUNCATE tasks RESTART IDENTITY CASCADE`;
}

const taskRepository = {
  insert,
  getById,
  getOfToday,
  getByNameAndUserId,
  update,
  truncate,
};

export default taskRepository;
