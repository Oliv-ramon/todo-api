import { User } from "@prisma/client";
import { prisma } from "../database.js";

export type UserData = Omit<User, "id">;

async function create(userData: UserData) {
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

const userRepository = {
  create,
  getByEmail,
};

export default userRepository;
