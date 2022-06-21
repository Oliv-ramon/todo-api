import dayjs from "dayjs";
import taskRepository, {
  CreateTaksData,
  UpdateTaskData,
} from "../repositories/taskRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";
import categoryService from "./categoryService.js";
import dayService from "./dayService.js";
import userService from "./userService.js";

async function create(createTaskData: CreateTaksData, userId: number) {
  await userService.validateExistence(userId);
  await dayService.validateDaysExistence(createTaskData.days);
  await categoryService.validateExistence(createTaskData.categoryId);
  await validateDuplicate(createTaskData.name, userId);

  return taskRepository.insert(createTaskData);
}

export interface GetOfTodayQueries {
  categoryId?: number;
}

async function getOfToday(queries: GetOfTodayQueries, userId: number) {
  await userService.validateExistence(userId);

  const todayWeekDayId = dayjs().day();

  if (queries.categoryId !== undefined) {
    await categoryService.validateExistence(queries.categoryId);
  }

  return taskRepository.getOfToday(todayWeekDayId, queries);
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
  getOfToday,
  update,
};

export default taskService;
