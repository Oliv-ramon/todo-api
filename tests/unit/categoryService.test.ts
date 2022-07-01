import { jest } from "@jest/globals";
import userRepository from "../../src/repositories/userRepository.js";
import {
  conflictError,
  unauthorizedError,
} from "../../src/utils/errorUtils.js";
import categoryFactory from "../factories/categoryFactory.js";
import categoryService from "../../src/services/categoryService.js";
import userFactory from "../factories/userFactory.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";

describe("Category Service tests", () => {
  describe("Creation tests", () => {
    const user = userFactory({ id: 1 });
    const category = categoryFactory({ id: 1, userId: user.id });

    it("should throw a not found error given an userId from an unexistent user", async () => {
      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(null);

      expect(async () => {
        await categoryService.create(category, user.id);
      }).rejects.toEqual(unauthorizedError("user not registered"));
    });

    it("should throw a conflict error given an existing category", async () => {
      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(user);
      jest
        .spyOn(categoryRepository, "getByNameAndUserId")
        .mockResolvedValueOnce(category);

      expect(async () => {
        await categoryService.create(category, user.id);
      }).rejects.toEqual(conflictError("this category already exist"));
    });

    it("should call insert functions with the expected params", async () => {
      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(user);
      jest
        .spyOn(categoryRepository, "getByNameAndUserId")
        .mockResolvedValueOnce(null);
      const insertCategoryMock = jest
        .spyOn(categoryRepository, "insert")
        .mockResolvedValueOnce(category);

      await categoryService.create(category, user.id);
      expect(insertCategoryMock).toBeCalledWith(category);
    });
  });

  describe("getTodays", () => {
    it("should throw a unauthorized error given a non registered user", async () => {
      const user = userFactory({ id: 1 });

      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(null);

      await expect(async () => {
        await categoryService.getTodays(user.id);
      }).rejects.toEqual(unauthorizedError("user not registered"));
    });
    it("should call the repository function with the expected params", async () => {
      const user = userFactory({ id: 1 });

      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(user);
      const repositoryFunctionMock = jest
        .spyOn(categoryRepository, "getAllThatHaveTasksToday")
        .mockResolvedValueOnce(null);

      await categoryService.getTodays(user.id);
      expect(repositoryFunctionMock).toBeCalledWith(user.id, expect.anything());
    });
  });

  describe("getAll", () => {
    it("should throw a unauthorized error given a non registered user", async () => {
      const user = userFactory({ id: 1 });

      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(null);

      await expect(async () => {
        await categoryService.getAll(user.id);
      }).rejects.toEqual(unauthorizedError("user not registered"));
    });

    it("should call the repository function with the expected params", async () => {
      const user = userFactory({ id: 1 });

      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(user);
      const repositoryFunctionMock = jest
        .spyOn(categoryRepository, "getAllByUserId")
        .mockResolvedValueOnce(null);

      await categoryService.getAll(user.id);
      expect(repositoryFunctionMock).toBeCalledWith(user.id);
    });
  });
});
