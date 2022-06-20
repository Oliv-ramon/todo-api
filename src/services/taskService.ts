import dayjs from "dayjs";
import taskRepository, {
  CreateTaksData,
} from "../repositories/taskRepository.js";
import { conflictError } from "../utils/errorUtils.js";
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

  return taskRepository.getAll(todayWeekDayId, queries);
}

async function validateDuplicate(name: string, userId: number) {
  const existingTask = await taskRepository.getByNameAndUserId(name, userId);

  if (existingTask) {
    throw conflictError("this task already exist");
  }
}

const taskService = {
  create,
  getOfToday,
};

export default taskService;
