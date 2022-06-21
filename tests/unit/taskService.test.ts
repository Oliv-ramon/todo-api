import { jest } from "@jest/globals";
import {
  badRequestError,
  conflictError,
  notFoundError,
} from "../../src/utils/errorUtils.js";
import daysFactory from "../factories/daysFactory.js";
import dayRepository from "../../src/repositories/dayRepository.js";
import taskFactory from "../factories/taskFactory.js";
import taskService from "../../src/services/taskService.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";
import categoryFactory from "../factories/categoryFactory.js";
import taskRepository from "../../src/repositories/taskRepository.js";
import userRepository from "../../src/repositories/userRepository.js";
import userFactory from "../factories/userFactory.js";

describe("Task Service tests", () => {
  describe("create", () => {
    const days = daysFactory();
    const user = userFactory({ id: 1 });

    jest.spyOn(dayRepository, "findAll").mockResolvedValue(days);

    it("should throw a bad request error given invalid days", async () => {
      const task = taskFactory({
        categoryId: 1,
        days: [{ id: 10, name: "someday" }],
      });

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);

      await expect(async () => {
        await taskService.create(task, user.id);
      }).rejects.toEqual(
        badRequestError("days property must to include valid days")
      );
    });

    it("should throw a not found error given an invalid category", async () => {
      const task = taskFactory({
        categoryId: 1,
        days,
      });

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);
      jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(null);

      await expect(async () => {
        await taskService.create(task, user.id);
      }).rejects.toEqual(notFoundError("category not found"));
    });

    it("should throw a conflict error given an duplicated task", async () => {
      const category = categoryFactory({ id: 1 });
      const task = taskFactory({ categoryId: category.id });

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);
      jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(category);
      jest
        .spyOn(taskRepository, "getByNameAndUserId")
        .mockResolvedValueOnce(task);

      await expect(async () => {
        await taskService.create(task, user.id);
      }).rejects.toEqual(conflictError("this task already exist"));
    });

    it("should call the inserction function with the expected params", async () => {
      const category = categoryFactory({ id: 1 });
      const task = taskFactory({ categoryId: category.id });

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);
      jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(category);
      jest
        .spyOn(taskRepository, "getByNameAndUserId")
        .mockResolvedValueOnce(null);
      const insertTaskMock = jest
        .spyOn(taskRepository, "insert")
        .mockResolvedValueOnce(task);

      await taskService.create(task, user.id);

      expect(insertTaskMock).toBeCalledWith(task);
    });
  });

  describe("getOfToday", () => {
    const user = userFactory({ id: 1 });
    const category = categoryFactory({ userId: user.id });

    it("should throw a not found error given an invalid userId", async () => {
      jest.spyOn(userRepository, "getById").mockResolvedValue(null);

      await expect(async () => {
        await taskService.getOfToday({ categoryId: category.id }, user.id);
      }).rejects.toEqual(notFoundError("user not found"));
    });

    it("should throw a not found error given an invalid categoryId", async () => {
      jest.spyOn(userRepository, "getById").mockResolvedValue(user);
      jest.spyOn(categoryRepository, "getById").mockResolvedValue(null);

      await expect(async () => {
        await taskService.getOfToday({ categoryId: 0 }, user.id);
      }).rejects.toEqual(notFoundError("category not found"));
    });
  });

  describe("update", () => {
    it("should throw a not found error given an id of a unexistent task", async () => {
      const task = taskFactory({ id: 1, categoryId: 1 });
      const updateTaskData = { checked: true };

      jest.spyOn(taskRepository, "getById").mockResolvedValueOnce(null);

      await expect(async () => {
        await taskService.update(task.id, updateTaskData);
      }).rejects.toEqual(notFoundError("task not found"));
    });
  });
});
