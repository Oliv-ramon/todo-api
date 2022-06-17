import taskRepository, {
  CreateTaksData,
} from "../repositories/taskRepository.js";
import { conflictError } from "../utils/errorUtils.js";
import categoryService from "./categoryService.js";
import dayService from "./dayService.js";
import userService from "./userService.js";

async function create(createTaskData: CreateTaksData, userId: number) {
  await userService.validateUserExistence(userId);
  await dayService.validateDaysExistence(createTaskData.days);
  await categoryService.validateExistence(createTaskData.categoryId);
  await validateDuplicate(createTaskData.name, userId);

  return taskRepository.insert(createTaskData);
}

async function getByUserIdOrCategoryId(categoryId: number, userId: number) {
  await userService.validateUserExistence(userId);

  if (categoryId !== null) {
    await categoryService.validateExistence(categoryId);
    return taskRepository.getAllByCategoryId(categoryId);
  }

  return taskRepository.getAllByUserId(userId);
}

async function validateDuplicate(name: string, userId: number) {
  const existingTask = await taskRepository.getByNameAndUserId(name, userId);

  if (existingTask) {
    throw conflictError("this task already exist");
  }
}

const taskService = {
  create,
  getByUserIdOrCategoryId,
};

export default taskService;
