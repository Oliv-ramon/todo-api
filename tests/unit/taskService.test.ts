import { jest } from "@jest/globals";
import {
  badRequestError,
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../../src/utils/errorUtils.js";
import taskFactory from "../factories/taskFactory.js";
import taskService from "../../src/services/taskService.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";
import categoryFactory from "../factories/categoryFactory.js";
import taskRepository, {
  CreateTaksData,
} from "../../src/repositories/taskRepository.js";
import userRepository from "../../src/repositories/userRepository.js";
import userFactory from "../factories/userFactory.js";
import weekDaysFactory from "../factories/weekDaysFactory.js";
import weekDayRepository from "../../src/repositories/weekDayRepository.js";
import dayjs from "dayjs";

describe("Task Service tests", () => {
  describe("create", () => {
    const weekDays = weekDaysFactory();
    const user = userFactory({ id: 1 });

    jest.spyOn(weekDayRepository, "findAll").mockResolvedValue(weekDays);

    it("should throw a bad request error given invalid days", async () => {
      const task = taskFactory({
        categoryId: 1,
        weekDays: [{ id: -1 }],
      });

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);

      await expect(async () => {
        await taskService.create(task, user.id);
      }).rejects.toEqual(
        badRequestError("weekDays must to include valid days")
      );
    });

    it("should throw a not found error given an invalid category", async () => {
      const task = taskFactory({
        categoryId: 1,
        weekDays,
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
      const userId = 1;
      const category = categoryFactory({ id: 1 });
      const task = taskFactory({ categoryId: category.id });

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);
      jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(category);
      jest
        .spyOn(taskRepository, "getByNameAndUserId")
        .mockResolvedValueOnce(null);
      const insertTaskMock = jest
        .spyOn(taskRepository, "insert")
        .mockImplementation(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (_userId: number, _createTaksData: CreateTaksData) => {
            return new Promise((resolve) => resolve());
          }
        );

      await taskService.create(task, user.id);
      expect(insertTaskMock).toBeCalledWith(userId, task);
    });
  });

  describe("getAll", () => {
    const user = userFactory({ id: 1 });
    const category = categoryFactory({ id: 1, userId: user.id });

    it("should throw a not found error given an invalid userId", async () => {
      jest.spyOn(userRepository, "getById").mockResolvedValue(null);

      await expect(async () => {
        await taskService.getAll({ categoryId: category.id }, user.id);
      }).rejects.toEqual(unauthorizedError("user not registered"));
    });

    it("should throw a not found error given an invalid categoryId", async () => {
      const date = JSON.stringify(dayjs());

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);
      jest.spyOn(categoryRepository, "getById").mockResolvedValue(null);

      await expect(async () => {
        await taskService.getAll({ categoryId: 0, date }, user.id);
      }).rejects.toEqual(notFoundError("category not found"));
    });

    it("should call the repository function with expected params", async () => {
      const date = JSON.stringify(dayjs());
      const queries = { categoryId: category.id, date };

      jest.spyOn(userRepository, "getById").mockResolvedValue(user);
      jest.spyOn(categoryRepository, "getById").mockResolvedValue(category);
      const inserctionMock = jest
        .spyOn(taskRepository, "getAllByUserIdOrQueries")
        .mockResolvedValue(null);

      await taskService.getAll(queries, user.id);
      expect(inserctionMock).toBeCalledWith(user.id, queries);
    });
  });

  describe("update", () => {
    const task = taskFactory({ id: 1, categoryId: 1 });
    const updateTaskData = { name: "newName" };

    it("should throw a not found error given an id of a unexistent task", async () => {
      jest.spyOn(taskRepository, "getById").mockResolvedValueOnce(null);

      await expect(async () => {
        await taskService.update(task.id, updateTaskData);
      }).rejects.toEqual(notFoundError("task not found"));
    });

    it("should call the repository function with expected params", async () => {
      jest.spyOn(taskRepository, "getById").mockResolvedValueOnce(task);
      const updateMock = jest
        .spyOn(taskRepository, "update")
        .mockResolvedValueOnce(null);

      await taskService.update(task.id, updateTaskData);
      expect(updateMock).toBeCalledWith(task.id, updateTaskData);
    });
  });
});
