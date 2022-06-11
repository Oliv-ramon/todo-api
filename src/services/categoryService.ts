import { UserData } from "../repositories/userRepository.js";
import { conflictError } from "../utils/errorUtils.js";
import categoryRepository, {
  CreateCategoryData,
} from "../repositories/categoryRepository.js";
import categoryUserRepository from "../repositories/categoryUserRepository.js";
import userService from "./userService.js";

export type LoginData = Omit<UserData, "name">;

async function create(categoryData: CreateCategoryData, userId: number) {
  await userService.validateUserExistence(userId);
  await validateDuplicateCategory(userId, categoryData.name);

  const { id: categoryId } = await categoryRepository.insert(categoryData);
  await categoryUserRepository.insert({
    categoryId,
    userId,
  });
}

async function getAll(userId: number) {
  await userService.validateUserExistence(userId);

  return categoryRepository.getByUserId(userId);
}

async function validateDuplicateCategory(userId: number, name: string) {
  const existingCategory = await categoryRepository.getByNameAndUserId(
    userId,
    name
  );

  if (existingCategory) {
    throw conflictError("this category already exist");
  }
}

const categoryService = {
  create,
  getAll,
};

export default categoryService;
