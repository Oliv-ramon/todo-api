import { UserData } from "../repositories/userRepository.js";
import { conflictError } from "../utils/errorUtils.js";
import categoryRepository, {
  CategoryData,
} from "../repositories/categoryRepository.js";

export type LoginData = Omit<UserData, "name">;

async function create(categoryData: CategoryData) {
  await validateDuplicateCategory(categoryData.userId, categoryData.name);

  return categoryRepository.insert(categoryData);
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

/* async function getUserOrfail(email: string) {
  const existingUser = await userRepository.getByEmail(email);
  if (!existingUser) {
    throw unauthorizedError("invalid credentials");
  }

  return existingUser;
} */

const categoryService = {
  create,
};

export default categoryService;
