import { Prisma, WeekDay } from "@prisma/client";
import { prisma } from "../database.js";
import { GetOfTodayQueries } from "../services/taskService.js";
import { internalServerError } from "../utils/errorUtils.js";
import {
  getWeekDayDate,
  getNextDayDateFormated,
} from "../utils/taskRepositoryUtils.js";
import eventRepository from "./eventRepository.js";

export type UpdateTaskData = Prisma.TaskUpdateInput;

export type CreateTaksData = Prisma.TaskCreateInput & {
  categoryId: number;
  weekDays: WeekDay[];
  times: number;
};

async function insert(
  userId: number,
  { name, categoryId, weekDays, times }: CreateTaksData
) {
  try {
    const taskCreated = await prisma.$transaction(async (prisma) => {
      const { id: taskId } = await prisma.task.create({
        data: {
          name,
          categoryId,
        },
      });

      const eventsToCreate = [];

      for (let i = 0; i < times; i++) {
        const daysToJump = i * 7;

        eventsToCreate.push(
          ...weekDays.map(({ id: weekDayId }) => ({
            userId,
            taskId,
            weekDayId,
            date: getWeekDayDate(weekDayId, daysToJump),
          }))
        );
      }

      await eventRepository.insertMany(eventsToCreate, prisma);
    });

    return taskCreated;
  } catch (err) {
    throw internalServerError(err.message);
  }
}

async function getById(taskId: number) {
  return prisma.task.findUnique({ where: { id: taskId } });
}

async function getAllByUserIdOrQueries(
  userId: number,
  queries?: GetOfTodayQueries
) {
  return prisma.task.findMany({
    where: {
      category: {
        userId,
      },
      events: {
        some: {
          date: {
            gte: queries.date,
            lt: getNextDayDateFormated(queries.date as Date),
          },
        },
      },
      categoryId: queries.categoryId,
    },
    include: {
      category: {
        select: {
          color: true,
        },
      },
      events: {
        select: {
          id: true,
          checked: true,
        },
        where: {
          date: {
            gte: queries.date,
            lt: getNextDayDateFormated(queries.date as Date),
          },
        },
      },
    },
  });
}

async function getByUserId(userId: number) {
  return prisma.task.findMany({
    where: {
      category: {
        userId,
      },
    },
  });
}

async function getByNameAndUserId(name: string, userId: number) {
  return prisma.task.findFirst({
    where: {
      name,
      category: {
        userId,
      },
    },
  });
}

async function update(taskId: number, taskUpdateData: UpdateTaskData) {
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: taskUpdateData,
  });
}

async function truncate() {
  return prisma.$executeRaw`TRUNCATE tasks RESTART IDENTITY CASCADE`;
}

const taskRepository = {
  insert,
  getById,
  getByUserId,
  getAllByUserIdOrQueries,
  getByNameAndUserId,
  update,
  truncate,
};

export default taskRepository;
