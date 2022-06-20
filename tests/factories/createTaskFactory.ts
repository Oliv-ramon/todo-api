import taskRepository from "../../src/repositories/taskRepository";
import taskFactory from "./taskFactory";

export default async function createTaskFactory(categoryId: number) {
  const task = taskFactory({ categoryId });
  return taskRepository.insert(task);
}
