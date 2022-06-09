import { User } from "@prisma/client";
import { prisma } from "../database.js";

export type UserData = Omit<User, "id">;

async function insert(userData: UserData) {
  await prisma.user.create({
    data: userData,
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
  getByEmail,
  truncate,
};

export default userRepository;
