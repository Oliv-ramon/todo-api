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
  date?: string;
}

async function getByDate(queries: GetOfTodayQueries, userId: number) {
  await userService.validateExistence(userId);

  if (queries.date === undefined) {
    return taskRepository.getByUserId(userId);
  }

  parseQueries(queries);

  const { date } = queries;
  const weekDayId = dayjs(date).day();
  delete queries.date;

  if (queries.categoryId !== undefined) {
    await categoryService.validateExistence(queries.categoryId);
  }

  return taskRepository.getByWeekDayId(weekDayId, queries);
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

function parseQueries(queries: GetOfTodayQueries) {
  for (const key in queries) {
    queries[key] = JSON.parse(queries[key]);
  }
}

const taskService = {
  create,
  getByDate,
  update,
};

export default taskService;
