import userRepository, { UserData } from "../repositories/userRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function signUp(userData: UserData) {
  await validateDuplicateUser(userData.email);

  return userRepository.insert({
    ...userData,
    password: bcrypt.hashSync(userData.password, 12),
  });
}

export type LoginData = Omit<UserData, "name">;

async function login(loginData: LoginData) {
  const {
    id: userId,
    name: userName,
    password,
  } = await getUserOrfail(loginData.email);

  validatePassword(loginData.password, password);

  const oneDayInMiliseconds = 24 * 60 * 60 * 100;
  const token = jwt.sign({ userId, userName }, process.env.JWT_SECRET, {
    expiresIn: oneDayInMiliseconds,
  });

  const auth = {
    userId,
    userName,
    token,
  };

  return auth;
}

async function validateDuplicateUser(email: string) {
  const existingUser = await userRepository.getByEmail(email);

  if (existingUser) {
    throw conflictError("this user already have an account");
  }
}

async function getUserOrfail(email: string) {
  const existingUser = await userRepository.getByEmail(email);

  if (!existingUser) {
    throw unauthorizedError("invalid credentials");
  }

  return existingUser;
}

function validatePassword(password: string, encriptedPassword: string) {
  const isValidPassword = bcrypt.compareSync(password, encriptedPassword);

  if (!isValidPassword) {
    throw unauthorizedError("invalid credentials");
  }
}

async function validateExistence(userId: number) {
  const user = await userRepository.getById(userId);

  if (!user) {
    throw unauthorizedError("user not registered");
  }
}

const userService = {
  signUp,
  login,
  validateExistence,
};

export default userService;
