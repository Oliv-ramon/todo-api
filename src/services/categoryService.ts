import { UserData } from "../repositories/userRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";
import categoryRepository, {
  CreateCategoryData,
} from "../repositories/categoryRepository.js";
import userService from "./userService.js";
import dayjs from "dayjs";
import { getWeekDayDate } from "../utils/taskRepositoryUtils.js";
import { formatDate } from "../utils/taskServiceUtils.js";

export type LoginData = Omit<UserData, "name">;

async function create(categoryData: CreateCategoryData, userId: number) {
  await userService.validateExistence(userId);
  await validateDuplicate(userId, categoryData.name);

  return categoryRepository.insert({
    ...categoryData,
    userId,
  });
}

async function getTodays(userId: number) {
  await userService.validateExistence(userId);

  const todayWeekDayId = dayjs().day();
  const todayDate = formatDate(getWeekDayDate(todayWeekDayId, 0));

  return categoryRepository.getAllThatHaveTasksToday(userId, todayDate);
}

async function getAll(userId: number) {
  await userService.validateExistence(userId);

  return categoryRepository.getAllByUserId(userId);
}

async function validateDuplicate(userId: number, name: string) {
  const existingCategory = await categoryRepository.getByNameAndUserId(
    userId,
    name
  );

  if (existingCategory) {
    throw conflictError("this category already exist");
  }
}

async function validateExistence(categoryId: number) {
  const existingCategory = await categoryRepository.getById(categoryId);

  if (!existingCategory) {
    throw notFoundError("category not found");
  }
}

const categoryService = {
  create,
  getAll,
  getTodays,
  validateExistence,
};

export default categoryService;
