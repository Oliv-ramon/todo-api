import { UserData } from "../repositories/userRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";
import categoryRepository, {
  CreateCategoryData,
} from "../repositories/categoryRepository.js";
import userService from "./userService.js";

export type LoginData = Omit<UserData, "name">;

async function create(categoryData: CreateCategoryData, userId: number) {
  await userService.validateUserExistence(userId);
  await validateDuplicate(userId, categoryData.name);

  return categoryRepository.insert({
    ...categoryData,
    userId,
  });
}

async function getAll(userId: number) {
  await userService.validateUserExistence(userId);

  return categoryRepository.getByUserId(userId);
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
  validateExistence,
};

export default categoryService;
