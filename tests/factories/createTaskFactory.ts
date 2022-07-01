import { Task } from "@prisma/client";
import taskRepository from "../../src/repositories/taskRepository";
import taskFactory from "./taskFactory";

type Params = Partial<Task>;

export default async function createTaskFactory(
  userId: number,
  categoryId: number,
  params?: Params
) {
  const task = taskFactory({ categoryId, ...params });
  return taskRepository.insert(userId, task);
}
