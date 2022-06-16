import taskRepository, {
  CreateTaksData,
} from "../repositories/taskRepository.js";
import { conflictError } from "../utils/errorUtils.js";
import categoryService from "./categoryService.js";
import dayService from "./dayService.js";

async function create(createTaskData: CreateTaksData, userId: number) {
  await dayService.validateDaysExistence(createTaskData.days);
  await categoryService.validateExistence(createTaskData.categoryId);
  await validateDuplicate(createTaskData.name, userId);

  return taskRepository.insert(createTaskData);
}

async function validateDuplicate(name: string, userId: number) {
  const existingTask = await taskRepository.getByNameAndUserId(name, userId);

  if (existingTask) {
    throw conflictError("this task already exist");
  }
}

const taskService = {
  create,
};

export default taskService;
