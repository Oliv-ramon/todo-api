import { Category } from "@prisma/client";
import { prisma } from "../database.js";
import { getNextDayDateFormated } from "../utils/taskRepositoryUtils.js";

export type CreateCategoryData = Omit<Category, "id" | "user">;

function insert(categoryData: CreateCategoryData) {
  return prisma.category.create({
    data: categoryData,
  });
}
function getAllByUserId(userId: number) {
  return prisma.category.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
  });
}

function getById(categoryId: number) {
  return prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
}

function getByNameAndUserId(userId: number, name: string) {
  return prisma.category.findFirst({
    where: {
      name,
      userId,
    },
  });
}

function getAllThatHaveTasksToday(userId: number, todayDate: Date) {
  return prisma.category.findMany({
    where: {
      userId,
      tasks: {
        some: {
          events: {
            some: {
              date: {
                gte: todayDate,
                lt: getNextDayDateFormated(todayDate),
              },
            },
          },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE categories RESTART IDENTITY CASCADE`;
}

const categoryRepository = {
  insert,
  getAllByUserId,
  getById,
  getByNameAndUserId,
  getAllThatHaveTasksToday,
  truncate,
};

export default categoryRepository;
