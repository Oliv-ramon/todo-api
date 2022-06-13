import taskRepository, {
  CreateTaksData,
} from "../repositories/taskRepository.js";
import { conflictError } from "../utils/errorUtils.js";
import categoryService from "./categoryService.js";
import dayService from "./dayService.js";

async function create(createTaskData: CreateTaksData) {
  await dayService.validateDaysExistence(createTaskData.days);
  await categoryService.validateExistence(createTaskData.categoryId);
  await validateDuplicate(createTaskData.categoryId, createTaskData.name);

  return taskRepository.insert(createTaskData);
}

async function validateDuplicate(categoryId: number, name: string) {
  const existingTask = await taskRepository.getByNameAndCategoryId(
    categoryId,
    name
  );

  if (existingTask) {
    throw conflictError("this task already exist");
  }
}

const taskService = {
  create,
};

export default taskService;
