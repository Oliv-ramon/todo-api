import { UserData } from "../repositories/userRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";
import categoryRepository, {
  CreateCategoryData,
} from "../repositories/categoryRepository.js";
import userService from "./userService.js";
import dayjs from "dayjs";

export type LoginData = Omit<UserData, "name">;

async function create(categoryData: CreateCategoryData, userId: number) {
  await userService.validateUserExistence(userId);
  await validateDuplicate(userId, categoryData.name);

  return categoryRepository.insert({
    ...categoryData,
    userId,
  });
}

async function getOfToday(userId: number) {
  await userService.validateUserExistence(userId);

  const todayWeekDayId = dayjs().day();
  return categoryRepository.getAllThatHaveTasksToday(userId, todayWeekDayId);
}

async function getAll(userId: number) {
  await userService.validateUserExistence(userId);

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
  getOfToday,
  validateExistence,
};

export default categoryService;
