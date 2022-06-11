import { User } from "@prisma/client";
import { prisma } from "../database.js";

export type UserData = Omit<User, "id">;

async function insert(userData: UserData) {
  return prisma.user.create({
    data: userData,
  });
}

async function getById(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function getByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function truncate() {
  await prisma.user.deleteMany();
}

const userRepository = {
  insert,
  getById,
  getByEmail,
  truncate,
};

export default userRepository;
