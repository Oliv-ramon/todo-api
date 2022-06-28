import taskRepository, {
  CreateTaksData,
  UpdateTaskData,
} from "../repositories/taskRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";
import categoryService from "./categoryService.js";
import weekDayService from "./weekDayService.js";
import userService from "./userService.js";
import { formatDate, parseQueries } from "../utils/taskServiceUtils.js";

async function create(createTaskData: CreateTaksData, userId: number) {
  await userService.validateExistence(userId);
  await weekDayService.validateWeekDaysExistence(createTaskData.weekDays);
  await categoryService.validateExistence(createTaskData.categoryId);
  await validateDuplicate(createTaskData.name, userId);

  return taskRepository.insert(userId, createTaskData);
}

export interface GetOfTodayQueries {
  categoryId?: number;
  date?: string | Date;
}

async function getAll(queries: GetOfTodayQueries, userId: number) {
  await userService.validateExistence(userId);

  if (queries.date === undefined) {
    return taskRepository.getByUserId(userId);
  }

  parseQueries(queries);
  queries.date = formatDate(queries.date as string);

  if (queries.categoryId !== undefined) {
    await categoryService.validateExistence(queries.categoryId);
  }

  return taskRepository.getAllByUserIdOrQueries(userId, queries);
}

async function update(taskId: number, taskUpdateData: UpdateTaskData) {
  await validateExistense(taskId);

  return taskRepository.update(taskId, taskUpdateData);
}

async function validateDuplicate(name: string, userId: number) {
  const existingTask = await taskRepository.getByNameAndUserId(name, userId);

  if (existingTask) {
    throw conflictError("this task already exist");
  }
}

async function validateExistense(taskId: number) {
  const task = await taskRepository.getById(taskId);

  if (!task) {
    throw notFoundError("task not found");
  }
}

const taskService = {
  create,
  getAll,
  update,
};

export default taskService;
