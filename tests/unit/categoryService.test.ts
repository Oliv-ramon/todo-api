import { jest } from "@jest/globals";
import userRepository from "../../src/repositories/userRepository.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";
import categoryFactory from "../factories/categoryFactory.js";
import categoryService from "../../src/services/categoryService.js";
import userFactory from "../factories/userFactory.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";

describe("Category Service tests", () => {
  describe("Creation tests", () => {
    it("should throw a not found error given an userId from an unexistent user", async () => {
      const category = categoryFactory({ id: 1 });
      const userId = 1;

      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(null);

      expect(async () => {
        await categoryService.create(category, userId);
      }).rejects.toEqual(notFoundError("user not found"));
    });

    it("should throw a conflict error given an existing category", async () => {
      const category = categoryFactory();
      const user = userFactory({ id: 1 });

      jest.spyOn(userRepository, "getById").mockResolvedValueOnce(user);
      jest
        .spyOn(categoryRepository, "getByNameAndUserId")
        .mockResolvedValueOnce(category);

      expect(async () => {
        await categoryService.create(category, user.id);
      }).rejects.toEqual(conflictError("this category already exist"));
    });

    it("should call insert functions with the expected params", async () => {
      const user = userFactory({ id: 1 });
      const category = categoryFactory({ id: 1, userId: user.id });

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
});
