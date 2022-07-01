import { prisma } from "../database.js";

function findAll() {
  return prisma.weekDay.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

const weekDayRepository = {
  findAll,
};

export default weekDayRepository;
