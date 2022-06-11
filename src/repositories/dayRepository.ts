import { Category } from "@prisma/client";
import { prisma } from "../database.js";

export type CreateCategoryData = Omit<Category, "id" | "user">;

function findAll() {
  return prisma.day.findMany();
}

const dayRepository = {
  findAll,
};

export default dayRepository;
